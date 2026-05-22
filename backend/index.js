import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import admin from "firebase-admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const demoUsers = [
  {
    id: "1",
    name: "Vishal Admin",
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
    designation: "Workspace Owner",
    department: "Operations",
  },
  {
    id: "2",
    name: "Vishal Staff",
    email: "employee@company.com",
    password: "employee123",
    role: "employee",
    designation: "Software Engineer",
    department: "Engineering",
  },
];

const demoEntries = [
  {
    id: "1",
    employeeId: "2",
    employeeName: "Vishal Staff",
    description: "UI Design for Dashboard",
    project: { name: "Acme Corp Redesign", color: "bg-blue-500", client: "Acme Corp" },
    tags: ["Design"],
    billable: true,
    startTime: "09:00 AM",
    endTime: "11:30 AM",
    duration: "02:30:00",
    durationMs: 9000000,
    date: "Today",
    status: "draft",
    createdAt: new Date().toISOString(),
  },
];

const sessions = new Map();

const parseServiceAccount = () => {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    }
    return parsed;
  } catch (error) {
    console.warn("FIREBASE_SERVICE_ACCOUNT is not valid JSON. Falling back to in-memory storage.");
    return null;
  }
};

const serviceAccount = parseServiceAccount();
const firebaseEnabled = Boolean(serviceAccount);

if (firebaseEnabled && admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const firestore = firebaseEnabled ? admin.firestore() : null;
let memoryEntries = [...demoEntries];

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  designation: user.designation,
  department: user.department,
});

const docToData = (doc) => ({ id: doc.id, ...doc.data() });

const seedFirestore = async () => {
  if (!firestore) return;

  const usersSnapshot = await firestore.collection("users").limit(1).get();
  if (usersSnapshot.empty) {
    const batch = firestore.batch();
    demoUsers.forEach((user) => {
      batch.set(firestore.collection("users").doc(user.id), user);
    });
    demoEntries.forEach((entry) => {
      batch.set(firestore.collection("entries").doc(entry.id), entry);
    });
    await batch.commit();
    console.log("Seeded Firestore with demo users and entries.");
  }
};

const usersStore = {
  async findByEmail(email) {
    const normalizedEmail = String(email || "").toLowerCase();

    if (!firestore) {
      return demoUsers.find((user) => user.email.toLowerCase() === normalizedEmail) || null;
    }

    const snapshot = await firestore
      .collection("users")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return docToData(snapshot.docs[0]);
  },

  async findById(id) {
    if (!firestore) {
      return demoUsers.find((user) => user.id === String(id)) || null;
    }

    const snapshot = await firestore.collection("users").doc(String(id)).get();
    return snapshot.exists ? docToData(snapshot) : null;
  },
};

const entriesStore = {
  async list(user) {
    if (!firestore) {
      return user.role === "admin"
        ? memoryEntries
        : memoryEntries.filter((entry) => entry.employeeId === user.id);
    }

    let query = firestore.collection("entries");
    if (user.role !== "admin") {
      query = query.where("employeeId", "==", user.id);
    }

    const snapshot = await query.get();
    return snapshot.docs
      .map(docToData)
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  },

  async create(user, entry) {
    const id = crypto.randomUUID();
    const newEntry = {
      ...entry,
      id,
      employeeId: user.id,
      employeeName: user.name,
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    if (!firestore) {
      memoryEntries.unshift(newEntry);
      return newEntry;
    }

    await firestore.collection("entries").doc(id).set(newEntry);
    return newEntry;
  },

  async findById(id) {
    if (!firestore) {
      return memoryEntries.find((entry) => entry.id === String(id)) || null;
    }

    const snapshot = await firestore.collection("entries").doc(String(id)).get();
    return snapshot.exists ? docToData(snapshot) : null;
  },

  async delete(id) {
    if (!firestore) {
      memoryEntries = memoryEntries.filter((entry) => entry.id !== String(id));
      return;
    }

    await firestore.collection("entries").doc(String(id)).delete();
  },
};

const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    const userId = token ? sessions.get(token) : null;
    const user = userId ? await usersStore.findById(userId) : null;

    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "You do not have permission to access this resource" });
  }

  next();
};

app.get("/", (req, res) => {
  res.send(`Timesheet API is running with ${firebaseEnabled ? "Firebase Firestore" : "in-memory demo storage"}.`);
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersStore.findByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = crypto.randomUUID();
    sessions.set(token, user.id);

    res.json({ token, user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  sessions.delete(req.token);
  res.status(204).send();
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json(publicUser(req.user));
});

app.get("/api/entries", requireAuth, async (req, res, next) => {
  try {
    res.json(await entriesStore.list(req.user));
  } catch (error) {
    next(error);
  }
});

app.post("/api/entries", requireAuth, requireRole("employee"), async (req, res, next) => {
  try {
    res.status(201).json(await entriesStore.create(req.user, req.body));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/entries/:id", requireAuth, async (req, res, next) => {
  try {
    const entry = await entriesStore.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (req.user.role !== "admin" && entry.employeeId !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own entries" });
    }

    await entriesStore.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong on the server" });
});

await seedFirestore();

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});

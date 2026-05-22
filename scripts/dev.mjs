import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import http from "node:http";
import net from "node:net";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const frontendPort = process.env.FRONTEND_PORT || "3000";
const backendPort = process.env.PORT || "5000";

const processes = [
  {
    name: "frontend",
    color: "\x1b[36m",
    port: frontendPort,
    url: `http://127.0.0.1:${frontendPort}/`,
    command: process.execPath,
    args: [
      join(rootDir, "frontend", "node_modules", "vite", "bin", "vite.js"),
      "--host",
      "127.0.0.1",
      "--port",
      frontendPort,
      "--strictPort",
    ],
    cwd: join(rootDir, "frontend"),
  },
  {
    name: "backend",
    color: "\x1b[35m",
    port: backendPort,
    url: `http://127.0.0.1:${backendPort}/`,
    expectedText: "Timesheet API is running",
    command: process.execPath,
    args: ["index.js"],
    cwd: join(rootDir, "backend"),
    env: { PORT: backendPort, HOST: "127.0.0.1" },
  },
];

const reset = "\x1b[0m";
const children = new Set();
let shuttingDown = false;

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port: Number(port) });
    socket.setTimeout(700);
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("error", () => resolve(false));
  });
}

function readUrl(url) {
  return new Promise((resolve) => {
    const request = http.get(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        resolve({ statusCode: response.statusCode, body });
      });
    });

    request.setTimeout(1000, () => {
      request.destroy();
      resolve(null);
    });
    request.on("error", () => resolve(null));
  });
}

async function isReusableService(config) {
  if (!(await isPortOpen(config.port))) return false;

  const response = await readUrl(config.url);
  if (!response || response.statusCode < 200 || response.statusCode >= 400) return false;
  if (config.expectedText && !response.body.includes(config.expectedText)) return false;

  return true;
}

function prefixOutput(stream, label, color, chunk) {
  const lines = chunk.toString().split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    stream.write(`${color}[${label}]${reset} ${line}\n`);
  }
}

function stopAll(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) child.kill();
  }

  process.exit(exitCode);
}

console.log("Starting Timesheets...");
console.log(`Frontend: http://127.0.0.1:${frontendPort}`);
console.log(`Backend:  http://127.0.0.1:${backendPort}`);
console.log("Press Ctrl+C to stop both.\n");

for (const config of processes) {
  if (await isReusableService(config)) {
    console.log(`${config.color}[${config.name}]${reset} already running at ${config.url}`);
    continue;
  }

  if (await isPortOpen(config.port)) {
    console.error(`${config.color}[${config.name}]${reset} port ${config.port} is already in use by another app.`);
    stopAll(1);
  }

  const child = spawn(config.command, config.args, {
    cwd: config.cwd,
    env: { ...process.env, ...config.env },
    stdio: ["inherit", "pipe", "pipe"],
  });

  children.add(child);

  child.stdout.on("data", (chunk) => prefixOutput(process.stdout, config.name, config.color, chunk));
  child.stderr.on("data", (chunk) => prefixOutput(process.stderr, config.name, config.color, chunk));

  child.on("exit", (code, signal) => {
    children.delete(child);
    if (shuttingDown) return;

    const reason = signal ? `signal ${signal}` : `code ${code}`;
    console.error(`${config.color}[${config.name}]${reset} stopped with ${reason}`);
    stopAll(code ?? 1);
  });
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

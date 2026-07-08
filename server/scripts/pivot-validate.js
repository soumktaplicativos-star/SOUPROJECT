import { spawn } from "node:child_process";

const STEPS = [
  ["npm", ["run", "check"]],
  ["npm", ["run", "db:check"]],
  ["npm", ["run", "auth:check"]],
  ["npm", ["run", "api:health"]],
  ["npm", ["run", "pivot:preflight"]],
];

function runStep(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: new URL("..", import.meta.url),
      stdio: "inherit",
      shell: false,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} falhou com codigo ${code}`));
    });
  });
}

async function main() {
  console.log("SOU Ops pivot validate");
  console.log("Modo: somente leitura");

  for (const [command, args] of STEPS) {
    console.log(`\n> ${command} ${args.join(" ")}`);
    await runStep(command, args);
  }

  console.log("\nPivot validate concluido com sucesso.");
}

main().catch((error) => {
  console.error("Pivot validate falhou:", error.message);
  process.exit(1);
});

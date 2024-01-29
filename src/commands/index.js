import { spawn, spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const commandScript = args[0];

const __dirname = dirname(fileURLToPath(import.meta.url));

const output = spawnSync(
  "node",
  ["-r", "sucrase/register", join(__dirname, commandScript + ".js")],
  {
    stdio: "pipe",
  }
);

if (output.error) {
  console.error(output.error);
}

output.output.filter(Boolean).forEach((d) => console.log(d.toString()));

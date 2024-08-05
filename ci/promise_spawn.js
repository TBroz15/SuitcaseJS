import { spawn } from "child_process";

export function spawnPromise(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data;
    });

    child.stderr.on("data", (data) => {
      stderr += data;
    });

    child.on("error", (error) => {
      reject(error.stack);
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        reject(`Child process exited with code ${code}:\n ${stderr} ${stdout}`);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

export const runCommands = async (cmds) => {
  let isFail = false;

  const promises = await Promise.allSettled(
    cmds.map(([cmd, ...args]) => spawnPromise(cmd, args))
  );

  promises.forEach((value, i) => {
    const cmdName = cmds[i].join(" ");

    if (value.status === "fulfilled") {
      console.log(`Command "${cmdName}" ran successfully.`);
    } else {
      console.error(`Command "${cmdName}" has encountered a problem.`);
      console.log(value.reason);
      isFail = true;
    }
  });

  if (isFail) process.exit(1);
};

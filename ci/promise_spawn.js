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
      reject(error);
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}: ${stderr}`));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

const { exec } = require('child_process');

const allProcesses = process.argv.slice(2);

for (let i = 0; i < allProcesses.length; i++) {
  const p = allProcesses[i];
  exec(`ts-node src/examples/${p}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);
  });
}

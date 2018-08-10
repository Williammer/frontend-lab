const fs = require("fs-extra");
const open = require("open");

const action = process.argv[2];
let targetPath = process.argv[3];

if (!action || (action !== "run" && !targetPath)) {
  throw "Invalid `action` or `targetPath` provided.";
}

const templatePath = "./_template";

switch (action) {
  case "run": {
    targetPath = targetPath || ".";
    open(`${targetPath}/index.html`);
    break;
  }

  case "rm": {
    fs.remove(targetPath, function(err) {
      if (err) throw err;

      console.log(`Removed '${targetPath}'!`);
    });
    break;
  }

  case "fork": {
    const newTargetPath = process.argv[4];

    if (!newTargetPath) {
      throw new Error("invalid input(newTargetPath) provided.");
    }

    fs.copy(targetPath, newTargetPath, err => {
      if (err) throw err;

      console.log(`Forked '${targetPath}' to ${newTargetPath}!`);
    });
    break;
  }

  case "create": {
    fs.copy(templatePath, targetPath, err => {
      if (err) throw err;

      console.log(`Created '${targetPath}'!`);
    });
    break;
  }

  default:
    throw new Error("unknown action, please use 'create'/'fork'/'rm'/'run' with a targetPath.");
}

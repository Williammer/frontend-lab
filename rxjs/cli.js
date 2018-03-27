const fs = require("fs-extra"),
  open = require("open"),
  action = process.argv[2],
  targetName = process.argv[3],
  newTargetName = process.argv[4];

if (!targetName || !action) {
  throw "Invalid `action` or `targetName` provided.";
  return;
}

const toPwdPath = name => `./${name}`;
const templatePath = toPwdPath("_template");
const tartoPwdPath = toPwdPath(targetName);
const targetHtmlPath = `${tartoPwdPath}/index.html`;

switch (action) {
  case "run":
    open(targetHtmlPath, "Google Chrome");
    break;

  case "rm": {
    fs.remove(tartoPwdPath, function(err) {
      if (err) throw err;

      console.log(`Removed '${targetName}'!`);
    });
    break;
  }

  case "fork": {
    if (!newTargetName) {
      throw new Error("invalid input(newTargetName) provided.");
    }

    fs.copy(tartoPwdPath, toPwdPath(newTargetName), err => {
      if (err) throw err;

      console.log(`Forked '${targetName}' to ${newTargetName}!`);
    });
    break;
  }

  case "create": {
    fs.copy(templatePath, tartoPwdPath, err => {
      if (err) throw err;

      console.log(`Created '${targetName}'!`);
    });
    break;
  }

  default:
    throw new Error("unknown action, please use 'create'/'fork'/'rm'/'run' with a targetName.");
    return;
}

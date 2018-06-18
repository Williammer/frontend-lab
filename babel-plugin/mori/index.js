const fs = require('fs');
const babel = require('babel-core');
const moriTransform = require('./mori-transform');

// read the filename from the command line arguments
const fileName = process.argv[2];

// read the code from this file
fs.readFile(fileName, function(err, data) {
  if (err) throw err;

  // convert from a buffer to a string
  const src = data.toString();

  // use our plugin to transform the source
  const out = babel.transform(src, {
    plugins: [moriTransform]
  });

  // print the generated code to screen
  console.log(out.code);
});

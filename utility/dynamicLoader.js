const fs = require("fs");
const path = require("path");

/**
 * Dynamically loads and exports modules from a directory.
 * @param {string} directory - The directory to load modules from.
 * @param {string} [excludeFile="index.js"] - The file to exclude from loading.
 * @returns {object} - An object with keys as file names (uppercase) and values as modules.
 */
const dynamicLoader = (directory, excludeFile = "index.js") => {
  const modules = {};

  fs.readdirSync(directory)
    .filter((file) => file !== excludeFile && file.endsWith(".js"))
    .forEach((file) => {
      const moduleName = path.basename(file, ".js")
      modules[moduleName] = require(path.join(directory, file));
    });

  return modules;
};

module.exports = dynamicLoader;

const fs = require("fs").promises;
const path = require("path");
const HBLogger = require(process.cwd() + "/utility/logger").logger;
const { requestWatch } = require(process.cwd() + "/utility/commonfunctions");

const routesFolderPath = path.join(process.cwd(), "root", "routes");

/**
 * Asynchronously load routes from all files in the routes folder.
 * Adds the company name as a prefix to paths and includes the originating file name.
 */
async function loadRoutesFromFolder(folderPath) {
  const routeFiles = await fs.readdir(folderPath);
  let allRoutes = [];

  routeFiles.map(async (file) => {
    const fileBaseName = file.split(".")[0];
    const routeModulePath = path.join(folderPath, file);

    // Dynamically import the route module
    const { [fileBaseName + "Routes"]: routeArray } = require(routeModulePath);

    if (Array.isArray(routeArray)) {
      const enhancedRoutes = routeArray.map((route) => ({
        ...route,
        path: `/${process.env.PARENT_PATH_NAME}/${fileBaseName}${route.path}`, // Prefix the company name
      }));
      allRoutes = allRoutes.concat(enhancedRoutes);
    }
  })

  return allRoutes;
}

/**
 * Registers the given routes with the app instance.
 */
function registerRoutes(app, routes) {
  routes.forEach((route) => {
    const handlers = [];

    if (Array.isArray(route.middlewares)) {
      handlers.push(...route.middlewares);
    }

    handlers.push(
      requestWatch(async (req, res, next) => {
        HBLogger.info(
          `LogTrack: ${JSON.stringify({
            servicename: "noraai",
            logtype: "request",
            logdate: new Date(),
            logdetails: {
              headers: JSON.stringify(req.headers),
              body: JSON.stringify(req.body),
              param: JSON.stringify(req.params),
              query: JSON.stringify(req.query),
            },
            filename: route.file,
          })}`
        );
        await route.controller(req, res, next);
      }),
    );

    app[route.type](
      route.path,
      ...handlers
    );
  });
}

module.exports = async (app) => {
  const allRoutes = await loadRoutesFromFolder(routesFolderPath);
  registerRoutes(app, allRoutes);
};

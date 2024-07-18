const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
}
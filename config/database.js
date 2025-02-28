"use strict";

const Sequelize = require("sequelize");
const config = require("./db.config"); // Now referring to separate config file

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
let sequelize;
if (process.env.DB_URL) {
  // Production/Render configuration
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  // Local development configuration
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      pool: dbConfig.pool,
      define: dbConfig.define,
      logging: dbConfig.logging,
    }
  );
}

// Initialize db object
const db = {};

// Import models
const Application = require("../app/models/application.model")(sequelize, Sequelize);

// Add models to db object
db.Application = Application;

// Initialize associations
// Application?.associate(db);

// Database connection test
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// Sync models with database (commented by default)
// Uncomment when schema changes are made
// sequelize.sync({
//     alter: true
//     // force: true // Use force:true to recreate tables (CAREFUL: drops existing tables!)
// });

module.exports = {
  db,
  Application,
  sequelize,
};

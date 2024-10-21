import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define interface for environment variables
interface Env {
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  HOST: string;
}

// Type casting for process.env variables (as they are originally strings or undefined)
const env: Env = {
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  HOST: process.env.HOST as string
};


// Initialize Sequelize with the required options
const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    host: env.HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch((err: Error) => {
    console.log("Connection failed: ", err.message);
  });

// Define the db object containing Sequelize and the sequelize instance
const db = { Sequelize, sequelize };

// Sync the models and log model definitions
db.sequelize
  .sync({ alter: true })
  .then(() => {
    const models = sequelize.models;
    const modelNames = Object.keys(models);

    modelNames.forEach((modelName) => {
      const model = models[modelName];
      model.describe().then(() => {
        console.log(`Model "${modelName}" has been migrated. Table definition:`);
      });
    });
  })
  .then(async () => {
    // Additional logic can be added here
  })
  .catch((error: Error) => {
    console.error("Error during synchronization: ", error.message);
  });

export default db;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Type casting for process.env variables (as they are originally strings or undefined)
const env = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.HOST
};
// Initialize Sequelize with the required options
const sequelize = new sequelize_1.Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.HOST,
    dialect: "mysql",
    logging: false,
});
// Authenticate the database connection
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection established");
})
    .catch((err) => {
    console.log("Connection failed: ", err.message);
});
// Define the db object containing Sequelize and the sequelize instance
const db = { Sequelize: sequelize_1.Sequelize, sequelize };
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
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // Additional logic can be added here
}))
    .catch((error) => {
    console.error("Error during synchronization: ", error.message);
});
exports.default = db;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidator = void 0;
const express_joi_validation_1 = require("express-joi-validation");
exports.joiValidator = (0, express_joi_validation_1.createValidator)({
    passError: true,
});

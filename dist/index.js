"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require('./db');
const authRoute = require('./routes/authRoute');
const app = (0, express_1.default)();
app.use('/auth', authRoute);
app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});

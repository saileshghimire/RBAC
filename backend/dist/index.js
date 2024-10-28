"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const secrets_1 = require("./secrets");
const client_1 = require("@prisma/client");
const error_1 = require("./middleware/error");
const routes_1 = __importDefault(require("./routes"));
const logger_1 = require("./logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(logger_1.loggerMiddleware);
// Create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// app.use(morgan('combined', { stream: accessLogStream }));
// app.use(morgan('tiny'));
// app.disable('x-powered-by');
app.use('/api', routes_1.default);
exports.prisma = new client_1.PrismaClient();
app.get('/', (req, res) => {
    res.json("Hello ..");
});
app.use(error_1.errorMiddleware);
app.listen(secrets_1.PORT, () => {
    console.log(`Server is running on port http://localhost:${secrets_1.PORT}`);
});

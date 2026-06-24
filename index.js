"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const transactions_routes_1 = __importDefault(require("./routes/transactions-routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 10000);
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS;
const corsOptions = (() => {
    if (!allowedOrigins?.trim()) {
        return {
            origin: true,
            credentials: true,
        };
    }
    return {
        origin: allowedOrigins.split(',').map((origin) => origin.trim()),
        credentials: true,
    };
})();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
app.use('/api/transactions', transactions_routes_1.default);
app.listen(port, () => {
    console.log(`WebAPI is running on port ${port}`);
});

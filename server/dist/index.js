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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// import prisma from './configs/prisma.config';
const client_1 = require("@prisma/client");
const post_router_1 = require("./routes/post.router");
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.static(__filename));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '30mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
//PRISMA TEST
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.create({
            data: {
                name: 'Rich',
                email: 'hello@prisma.com',
                posts: {
                    create: {
                        title: 'My first post',
                        body: 'Lots of really interesting stuff',
                        slug: 'my-first-post',
                    },
                },
            },
        });
        const allUsers = yield prisma.user.findMany({
            include: {
                posts: true,
            },
        });
        console.dir(allUsers, { depth: null });
    });
}
main()
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    process.exit(1);
}))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
// Routes
app.use(post_router_1.router);
const server = () => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
const start = () => {
    try {
        server();
        // Connect db and etc...
    }
    catch (error) {
        console.error(error);
    }
};
start();
// process.on('SIGINT', () => server.close());
// process.on('SIGTERM', () => server.close());
//fsaffffffffffffffffffff

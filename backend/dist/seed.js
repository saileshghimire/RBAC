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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const predefinedItems = [
            { name: 'User' },
            { name: 'Role' },
            { name: 'Log' },
            { name: 'Model3' },
            { name: 'Model4' },
            { name: 'Model5' },
        ];
        const password = '123456';
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const permissions = ['create', 'read', 'update', 'delete'];
        const items = [];
        //  create items
        for (const item of predefinedItems) {
            const createdItem = yield prisma.item.create({
                data: item,
            });
            items.push(createdItem.name.toLowerCase());
        }
        // create admin role
        const adminRole = yield prisma.role.create({
            data: {
                name: 'Admin'
            }
        });
        // seed permission 
        for (const item of items) {
            for (const action of permissions) {
                yield prisma.permissions_category.create({
                    data: {
                        roleId: adminRole.id,
                        permission: `${action}_${item}`
                    }
                });
            }
        }
        // create user
        yield prisma.user.create({
            data: {
                username: 'sailesh',
                password: hashedPassword,
                firstname: 'sailesh',
                lastname: 'Admin',
                address: '123 Admin Street',
                phonenumber: '1234567890',
                dateofbirth: new Date('1990-01-01'),
                roleID: adminRole.id,
            },
        });
        console.log("seeding complete");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));

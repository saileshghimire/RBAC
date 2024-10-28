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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (items, currentPage, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItems = items.length;
    const totalpages = Math.ceil(totalItems / pageSize);
    const StartIndex = (currentPage - 1) * pageSize;
    const endIndex = StartIndex + pageSize;
    const paginatedItems = items.slice(StartIndex, endIndex);
    return {
        data: paginatedItems,
        currentPage,
        pageSize,
        totalItems,
        totalpages
    };
});
exports.paginate = paginate;

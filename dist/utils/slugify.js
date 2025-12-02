"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueSlug = exports.generateSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const generateSlug = (text) => {
    return (0, slugify_1.default)(text, {
        lower: true,
        strict: true,
        trim: true,
    });
};
exports.generateSlug = generateSlug;
const generateUniqueSlug = async (text, checkExists) => {
    let slug = (0, exports.generateSlug)(text);
    let counter = 1;
    while (await checkExists(slug)) {
        slug = `${(0, exports.generateSlug)(text)}-${counter}`;
        counter++;
    }
    return slug;
};
exports.generateUniqueSlug = generateUniqueSlug;
//# sourceMappingURL=slugify.js.map
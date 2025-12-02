"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromR2 = exports.uploadToR2 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const r2_1 = require("../config/r2");
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const uploadToR2 = async (file, folder = 'uploads') => {
    const fileExtension = path_1.default.extname(file.originalname);
    const filename = `${folder}/${(0, crypto_1.randomBytes)(16).toString('hex')}${fileExtension}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: r2_1.R2_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
    });
    await r2_1.r2Client.send(command);
    return {
        filename,
        url: `${r2_1.R2_PUBLIC_URL}/${filename}`,
        size: file.size,
        mimeType: file.mimetype,
    };
};
exports.uploadToR2 = uploadToR2;
const deleteFromR2 = async (filename) => {
    const command = new client_s3_1.DeleteObjectCommand({
        Bucket: r2_1.R2_BUCKET_NAME,
        Key: filename,
    });
    await r2_1.r2Client.send(command);
};
exports.deleteFromR2 = deleteFromR2;
//# sourceMappingURL=uploadToR2.js.map
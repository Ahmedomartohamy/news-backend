import multer from 'multer';
/**
 * Multer configuration for file uploads
 * Stores files in memory as Buffer
 */
declare const upload: multer.Multer;
/**
 * Middleware for single file upload
 * Usage: upload.single('fieldName')
 */
export declare const uploadSingle: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * Middleware for multiple files upload
 * Usage: upload.array('images', 10)
 */
export declare const uploadMultiple: (fieldName: string, maxCount?: number) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * Middleware for multiple fields
 * Usage: uploadFields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 5 }])
 */
export declare const uploadFields: (fields: {
    name: string;
    maxCount: number;
}[]) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export default upload;
//# sourceMappingURL=upload.d.ts.map
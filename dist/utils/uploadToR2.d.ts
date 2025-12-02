export interface UploadResult {
    filename: string;
    url: string;
    size: number;
    mimeType: string;
}
export declare const uploadToR2: (file: Express.Multer.File, folder?: string) => Promise<UploadResult>;
export declare const deleteFromR2: (filename: string) => Promise<void>;
//# sourceMappingURL=uploadToR2.d.ts.map
import { PaginationQuery } from '../types/requests';
export declare class MediaService {
    /**
     * Upload media file to R2
     */
    uploadMedia(file: Express.Multer.File, uploadedBy: number): Promise<{
        uploader: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        filename: string;
        size: number;
        mimeType: string;
        originalName: string;
        r2Url: string;
        uploadedBy: number;
    }>;
    /**
     * Upload multiple media files
     */
    uploadMultipleMedia(files: Express.Multer.File[], uploadedBy: number): Promise<({
        uploader: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        filename: string;
        size: number;
        mimeType: string;
        originalName: string;
        r2Url: string;
        uploadedBy: number;
    })[]>;
    /**
     * Get all media with pagination
     */
    getAllMedia(query: PaginationQuery, userId?: number, userRole?: string): Promise<{
        media: ({
            uploader: {
                id: number;
                email: string;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            filename: string;
            size: number;
            mimeType: string;
            originalName: string;
            r2Url: string;
            uploadedBy: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Get media by ID
     */
    getMediaById(id: number): Promise<{
        uploader: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        filename: string;
        size: number;
        mimeType: string;
        originalName: string;
        r2Url: string;
        uploadedBy: number;
    }>;
    /**
     * Get media by user
     */
    getMediaByUser(userId: number, query: PaginationQuery): Promise<{
        media: {
            id: number;
            createdAt: Date;
            filename: string;
            size: number;
            mimeType: string;
            originalName: string;
            r2Url: string;
            uploadedBy: number;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Delete media
     */
    deleteMedia(id: number, userId: number, userRole: string): Promise<{
        message: string;
    }>;
    /**
     * Get media statistics
     */
    getMediaStats(userId?: number, userRole?: string): Promise<{
        totalFiles: number;
        totalSize: number;
        totalSizeMB: string;
    }>;
    /**
     * Search media by filename or original name
     */
    searchMedia(query: string, pagination: PaginationQuery, userId?: number, userRole?: string): Promise<{
        media: ({
            uploader: {
                id: number;
                email: string;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            filename: string;
            size: number;
            mimeType: string;
            originalName: string;
            r2Url: string;
            uploadedBy: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
declare const _default: MediaService;
export default _default;
//# sourceMappingURL=mediaService.d.ts.map
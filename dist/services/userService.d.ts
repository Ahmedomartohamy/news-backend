import { UserRole } from '@prisma/client';
import { RegisterRequest, PaginationQuery } from '../types/requests';
export declare class UserService {
    /**
     * Create a new user
     */
    createUser(data: RegisterRequest & {
        role?: UserRole;
    }): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatarUrl: string | null;
        bio: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Get user by email (for login)
     */
    getUserByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatarUrl: string | null;
        bio: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    /**
     * Get user by ID
     */
    getUserById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatarUrl: string | null;
        bio: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            articles: number;
            comments: number;
        };
    }>;
    /**
     * Get all users with pagination
     */
    getAllUsers(query: PaginationQuery): Promise<{
        users: {
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            avatarUrl: string | null;
            isActive: boolean;
            createdAt: Date;
            _count: {
                articles: number;
            };
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Update user
     */
    updateUser(id: number, data: {
        name?: string;
        bio?: string;
        avatarUrl?: string;
    }): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatarUrl: string | null;
        bio: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Change user password
     */
    changePassword(id: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    /**
     * Change user role (admin only)
     */
    changeUserRole(id: number, role: UserRole): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatarUrl: string | null;
        bio: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Deactivate user
     */
    deactivateUser(id: number): Promise<{
        message: string;
    }>;
    /**
     * Activate user
     */
    activateUser(id: number): Promise<{
        message: string;
    }>;
    /**
     * Delete user
     */
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    /**
     * Verify password
     */
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=userService.d.ts.map
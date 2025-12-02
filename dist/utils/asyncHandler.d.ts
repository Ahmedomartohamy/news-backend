import { Request, Response, NextFunction } from 'express';
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const asyncHandler: (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map
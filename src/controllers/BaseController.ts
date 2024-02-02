import { Request, Response } from "express";

export abstract class BaseController {
    protected abstract executeImplement(req: Request, res: Response): Promise<void>;

    public async execute(req: Request, res: Response) {
        try {
            await this.executeImplement(req, res);
        } catch(err) {
            console.log('[BaseController]: Caught controller error!');
            console.log(err);
            this.internalError(res, 'An unexpected error has ocurred');
        }
    }

    public static jsonResponse(res: Response, status: number, message: string) {
        return res.status(status).json({ message });
    }

    public dataTransfer<T>(res: Response, dto: T) {
        return res.status(200).json(dto);
    }

    public clientError(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 400, message ?? "Bad Request");
    }

    public unauthorized(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 401, message ?? "Unauthorized");
    }

    public forbidden(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 403, message ?? "Forbidden");
    }

    public notFound(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 404, message ?? "Not Found");
    }

    public internalError(res: Response, error: Error | string) {
        return res.status(500).json({
            message: error.toString()
        });
    }
}
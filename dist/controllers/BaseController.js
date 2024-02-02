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
exports.BaseController = void 0;
class BaseController {
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.executeImplement(req, res);
            }
            catch (err) {
                console.log('[BaseController]: Caught controller error!');
                // console.log(err);
                this.internalError(res, 'An unexpected error has ocurred');
            }
        });
    }
    static jsonResponse(res, status, message) {
        return res.status(status).json({ message });
    }
    dataTransfer(res, dto) {
        return res.status(200).json(dto);
    }
    clientError(res, message) {
        return BaseController.jsonResponse(res, 400, message !== null && message !== void 0 ? message : "Bad Request");
    }
    unauthorized(res, message) {
        return BaseController.jsonResponse(res, 401, message !== null && message !== void 0 ? message : "Unauthorized");
    }
    forbidden(res, message) {
        return BaseController.jsonResponse(res, 403, message !== null && message !== void 0 ? message : "Forbidden");
    }
    notFound(res, message) {
        return BaseController.jsonResponse(res, 404, message !== null && message !== void 0 ? message : "Not Found");
    }
    internalError(res, error) {
        return res.status(500).json({
            message: error.toString()
        });
    }
}
exports.BaseController = BaseController;

import express, { Router, Request, Response } from 'express';

import loginUser from '../controllers/auth/LoginUserController';
import logoutUser from '../controllers/auth/LogoutUserController';
import createUser from '../controllers/auth/CreateUserController';
import verifyUser from '../controllers/auth/VerifyUserController';
import resendVerify from '../controllers/auth/ResendVerifyController';
import updateUser from '../controllers/auth/UpdateUserController';
import deleteUser from '../controllers/auth/DeleteUserController';

import { authorizedRoute } from './protectedRoute';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => loginUser.execute(req, res));
router.get('/logout', authorizedRoute, (req: Request, res: Response) => logoutUser.execute(req, res));

router.post('/', (req: Request, res: Response) => createUser.execute(req, res));
router.post('/verify', (req: Request, res: Response) => verifyUser.execute(req, res));
router.post('/resend', (req: Request, res: Response) => resendVerify.execute(req, res));

router.put('/', authorizedRoute, (req: Request, res: Response) => updateUser.execute(req, res));
router.delete('/', authorizedRoute, (req: Request, res: Response) => deleteUser.execute(req, res));

module.exports = router;
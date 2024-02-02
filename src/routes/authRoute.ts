import express, { Router, Request, Response } from 'express';

import getUser from '../controllers/auth/GetUserController';
import createUser from '../controllers/auth/CreateUserController';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => getUser.execute(req, res));
router.post('/', (req: Request, res: Response) => createUser.execute(req, res));
router.put('/');
router.delete('/');

module.exports = router;
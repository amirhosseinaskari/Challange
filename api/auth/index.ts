import express, {Response, Request} from 'express'
import {User} from 'models/user'
const router = express.Router()

// register a user
router.get('/register', (req: Request, res: Response) => {})

export default router

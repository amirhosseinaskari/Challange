import { Request, Response } from 'express'

export const error = (err: Error, req: Request, res: Response) => {
  res.status(500).send('Something is failed')
}

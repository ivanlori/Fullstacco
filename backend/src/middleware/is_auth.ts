import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import 'dotenv/config'

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.get('Authorization')

	if (!authorization) {
		return res.status(401).json({
			message: 'missing_authorization'
		})
	}
	const token = authorization.split(' ')[1]

	let decodedToken: string | JwtPayload

	try {
		decodedToken = jwt.verify(token, String(process.env.SECRET_KEY))
	} catch (err) {
		if (
			err instanceof TokenExpiredError &&
			err.name === 'TokenExpiredError'
		) {
			return res.status(401).json({
				message: 'token_expired'
			})
		}

		return res.status(401).json({
			message: 'error_verifing_token'
		})
	}

	if (!decodedToken) {
		return res.status(401).json({
			message: 'token_not_decoded'
		})
	}

	// @ts-expect-error
	req.body.userId = decodedToken.userId

	next()
}

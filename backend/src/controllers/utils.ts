import { NextFunction } from "express"

interface Error {
	statusCode: number;
}

export const handleErrorStatus = (
	err: Error,
	next: NextFunction | null
) => {
	if (err) {
		err.statusCode = 500
	}

	if (next) {
		next(err)
	}
}
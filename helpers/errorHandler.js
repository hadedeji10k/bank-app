const errorHandler = (err, req, res, next) => {
	console.log(err)
	if (process.env.NODE_ENV === 'development') {
		if (!err.statusCode) err.statusCode = 500
		return res.status(err.statusCode).json({
			status: false,
			title: err.name,
			errorMessage: err.message,
			stack: err.stack,
		})
	}

	if (!err.statusCode) err.statusCode = 500
	return res.status(err.statusCode).json({
		status: false,
		message: err.message,
	})
}

export default errorHandler

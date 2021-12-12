
const errorResponseHandler = (res, code, message, success) => {
	if (process.env.NODE_ENV === 'development') {
		return res.status(code).json({
			success,
			message
		})
	}

	return res.status(code).json({
        success,
		status: code,
		message
	})
}

export default errorResponseHandler;
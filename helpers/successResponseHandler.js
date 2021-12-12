
const successResponseHandler = (res, code, data, message, success) => {
	if (process.env.NODE_ENV === 'development') {
		return res.status(code).json({
			success,
			message,
            data
		})
	}

	return res.status(code).json({
        success,
		status: code,
		message,
        data
	})
}

export default successResponseHandler;
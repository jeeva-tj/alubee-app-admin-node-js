const errorHandle = (err, req, res, next) => {

    const status = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(status).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}


const notFound = (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export {
    errorHandle,
    notFound
}
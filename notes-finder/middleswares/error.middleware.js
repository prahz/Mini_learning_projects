const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    let message;if (status >= 500) {
    
    message = "Internal Server Error";
    } else {
    message = err.message || "Bad Request";
    }
    res.status(status).json({
    error: message
    });
};
module.exports = errorHandler;

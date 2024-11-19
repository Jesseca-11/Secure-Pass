const preserveRequestUserMiddleware = (request, response, next) => {
    // Preserve `request.user` before multer middleware processes the request
    const userBackup = request.user;

    // Proceed to the next middleware
    next();

    // Restore `request.user` after multer middleware processes the request
    request.user = userBackup;
};

module.exports = preserveRequestUserMiddleware;

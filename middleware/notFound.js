const apiNotFound = ( req, res, next ) => {
    // res.json({
    //     status: 'error',
    //     message: 'API endpoint not supported'
    // });

    next(new Error("API not found."))
};

module.exports = {
    apiNotFound
};
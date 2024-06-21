async function userLogoutController(req, res) {
    try {
        res.clearCookie('token');
        res.json({
            message: 'User logged out',
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = userLogoutController

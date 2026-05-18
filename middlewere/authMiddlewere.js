function authMiddlewere(req, res, next) {
    
    if (req.session.isAuth) {
        next()
    }else{
        return res.json({
            error: "Unauthorized Access"
        })
    }
}

module.exports = authMiddlewere
module.exports = function auth(req, res, next) {
    console.log(req.path)
    console.log(req.query)
    if (req.query.username === 'apolo') {
        next()
    }
    else {
next('something is wrong')    }
}

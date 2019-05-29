const cors = (req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header(
        "Acces-Control-Allow-Headers",
        "Origin-X-Requested-With, Content-Type, Acept, Authoritation"
    );
    if(req.method == "OPTIONS"){
        res.header(
            "Acces-Control-Allow-Methods",
            "PUT, POST, PATHC, DELETE, GET"
        );
        return res.status(200).json({});
    }
    next();
}
module.exports = cors;
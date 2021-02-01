const getLoggedInUser = require("../../util");

function checkForRole(req, res, next) {
    const user = getLoggedInUser(req, res);
    if(user.role === 2)
       return res.sendStatus(403);
    else 
    next();
}

module.exports = checkForRole;
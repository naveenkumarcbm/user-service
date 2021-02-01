function getLoggedInUser(req, res) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(".")[1];
        const user = JSON.parse(Buffer.from(token, 'base64').toString())
        return user;   
    } catch (error) {
      console.log(error);
      res.sendStatus(401)
    }
}

module.exports = getLoggedInUser;

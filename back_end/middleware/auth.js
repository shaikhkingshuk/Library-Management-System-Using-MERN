module.exports = (req, res, next) => {
  console.log("auth 1st : " + req.session.userID);
  if (!req.session.userID) {
    //console.log("auth data : " + req.session.userID);
    return res.status(401).send("Unauthorized");
  }
  //console.log("preparing to go to next");
  next();
};

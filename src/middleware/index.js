const bcrypt = require("bcryptjs");
const User = require("../user/model");

exports.hashPassword = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        req.body.password = hashedPassword
        next()
    } catch (error) {
        console.log(error)
    }    
}

exports.unHash = async (req, res, next) => {
    try {
      req.user = await User.findOne({ username: req.body.username });
      const result = await bcrypt.compare(req.body.password, req.user.password);

      // console.log(result)
      if (result) {
        next();
        console.log("You password is correct :)")
      } else {
        throw new Error("Your password is incorrect :(");
      }
    } catch (error) {
      console.log(error);
      res.send({ error: error.code });
    }
  };

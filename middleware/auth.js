const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Not Authorzed, Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authUser;

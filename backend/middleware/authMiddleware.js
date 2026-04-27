import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    

    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    const decoded = jwt.verify(token.split(" ")[1], "secret");

    req.user = decoded; 

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
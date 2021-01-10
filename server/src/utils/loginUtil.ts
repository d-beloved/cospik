import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;


// checks if a token was passed into the request header
const checkToken = (req, res) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      req.userData = decoded.id;
      if (req.userData !== null) {
        return res.status(200).json({ message: 'You are already logged in', success: true });
      }
    } catch (error) {
      return res.status(401)
        .json({ message: 'Token is invalid, Please login', success: false });
    }
  }
}

export default checkToken;

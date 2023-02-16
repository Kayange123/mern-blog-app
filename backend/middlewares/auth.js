import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;
    let decodedData;
    if (token && isCustomToken) {
      decodedData = jwt.verify(token, "MernBlogApp");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    console.log(req);
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;

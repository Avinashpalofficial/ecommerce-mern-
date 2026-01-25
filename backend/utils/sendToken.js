import jwt from "jsonwebtoken";
    const sendToken = (user, statusCode, res) => {
    const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  );

  console.log("toekn=", token);
  const cookieExpire = Number(process.env.COOKIE_EXPIRES_TIME) || 7;
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user});
};

export default sendToken;

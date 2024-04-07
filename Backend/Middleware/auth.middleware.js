import jwt from "jsonwebtoken";
//Authorization Middleware
async function auth(req, res, next) {
  try {
    //1.Get Access Token and refresh token from cookie , if not throw error
    //2.if Access Token does not expire go to next
    //3.If access token is expired and refresh token is not expired than regernate access token and update new refresh token
    //4.If both access token and refresh token is expired than say too login

    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    console.log(accessToken, refreshToken);

    if (!accessToken || !refreshToken) {
      return res.status(401).json({
        isOk: false,
        auth: "Authorization error",
        message: "Both token not got so please login first",
      });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
      //Expired Access Token so it will go in err part else in decoded part
      if (err) {
        //Checking Refresh Token Expiration
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN,
          (Refresh_err, Refresh_decoded) => {
            //Refresh Token Expired
            if (Refresh_err) {
              return res.status(401).json({
                isOk: false,
                auth: "Authorization error and both token has expired",
                message: "Please login first",
              });
            } //Refresh Token not expired
            else {
              //Generate both new access and refresh token
              const newAccessToken = jwt.sign(
                { id: Refresh_decoded.id },
                process.env.ACCESS_TOKEN,
                { expiresIn: "1d" }
              );
              const newRefreshToken = jwt.sign(
                { id: Refresh_decoded.id },
                process.env.REFRESH_TOKEN,
                { expiresIn: "10d" }
              );

              if (!accessToken) {
                return res.status(400).json({
                  message: "Access token not generated",
                });
              }

              if (!refreshToken) {
                return res.status(400).json({
                  message: "Refresh token not generated",
                });
              }

              //Set both of them in cookies
              res.cookie("access_token", newAccessToken, { httpOnly: true });
              res.cookie("refresh_token", newRefreshToken, { httpOnly: true });

              req.id = Refresh_decoded.id;
              next();
            }
          }
        );
      } //Access Token Not Expired
      else {
        //Store in request
        req.id = decoded.id;
        //Authenticated
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      isOk: false,
      auth: "Authorization error",
      message: error.message,
    });
  }
}

export default auth;

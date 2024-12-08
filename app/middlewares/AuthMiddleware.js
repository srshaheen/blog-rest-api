import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {
    let token = req.cookies["Token"];
    let decoded = DecodeToken(token)

    if (decoded === null) {
        res.status(401).json({ status: "fail", message: "Unauthorized" })
    }
    else {
        let email = decoded.email;
        req.headers.email = email;
        next();
    }
}



// let options = {
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     httpOnly: true,
//     sameSite: "none",
//     secure: true,
// };
// res.cookie("Token", decoded.RefreshToken, options);
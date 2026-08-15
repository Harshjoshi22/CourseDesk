import jwt from "jsonwebtoken";

export const generateToken = (user, res, message, statuscode = 200) => {
    const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    return res
        .status(statuscode)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
            success: true,
            message,
            user,
        });
};
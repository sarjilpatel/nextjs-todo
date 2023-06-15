import { User } from "../../../models/user";
import { connectDB, generateToken } from "../../../utils/features";
import { cookieSetter } from "../../../utils/features";
import { asyncError, errorHandler } from "../../../middleware/error";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST requests allowed");

  const { email, password } = req.body;
  if (!email || !password)
    return errorHandler(res, 400, "Please enter all fields");

  await connectDB();

  const user = await User.findOne({ email }).select("+password");
  if (!user) return errorHandler(res, 400, "Email or Password is wrong");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return errorHandler(res, 400, "Email or Password is wrong");

  const token = generateToken(user._id);
  cookieSetter(res, token, true);

  res.status(200).json({
    success: true,
    message: "Login successfull",
    user,
  });
});

export default handler;

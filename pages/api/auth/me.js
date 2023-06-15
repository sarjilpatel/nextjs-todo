import { User } from "../../../models/user";
import { checkAuth, connectDB, generateToken } from "../../../utils/features";
import { cookieSetter } from "../../../utils/features";
import { asyncError, errorHandler } from "../../../middleware/error";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET requests allowed");

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login first");

  res.status(200).json({
    success: true,
    user,
  });
});

export default handler;

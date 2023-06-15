import { cookieSetter } from "../../../utils/features";
import { asyncError, errorHandler } from "../../../middleware/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET requests allowed");

  cookieSetter(res, null, false);

  res.status(200).json({
    success: true,
    message: "Logout successfull",
  });
});

export default handler;

import { checkAuth, connectDB } from "../../../utils/features";
import { Task } from "../../../models/task";
import { asyncError, errorHandler } from "../../../middleware/error";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login first");

  const taskId = req.query.id;

  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated Successfully",
    });
  } else if (req.method === "DELETE") {
    task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    errorHandler(res, 400, "This method is not available");
  }
});

export default handler;

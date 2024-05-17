const todoRepository = require("../repositories/todoRepository");
const { v4: uuidv4 } = require("uuid"); //newely added line
exports.addTask = async (req, res) => {
  const uniqueUserId = uuidv4(); //newely added line
  const { taskName } = req.body;
  const task = { taskName };
  task["userId"] = uniqueUserId; //newely added line

  try {
    const results = await todoRepository.addTask(task);
    // return res.status(200).json(results);
    return res.status(200).json({
      status: 200,
      message: "task added successfully",
      results: results,
    });
  } catch (error) {
    return res.status(500).send("Error adding task");
  }
};
exports.updateTask = async (req, res) => {
  const id = req.params.id;

  const isDone = req.body.isDone;
  try {
    const results = await todoRepository.updateTask(isDone, id);
    //console.log(isDone);
    return res.status(200).json({
      status: 200,
      message: "task updated successfully",
      results: results,
    });
  } catch (error) {
    return res.status(500).send("Error updating task");
  }
};
exports.viewTask = async (req, res) => {
  try {
    //const id = req.user.id; //newely added line

    const results = await todoRepository.viewTask(); //id newely added

    return res.status(200).json({
      status: 200,
      message: "task fetching successfull",
      results: results,
    });
  } catch (error) {
    return res.status(500).send("Error viewing task");
  }
};
exports.getDataByUserId = async (req, res) => {
  try {
    const userId = req.body.userId;
    const results = await todoRepository.getDataByUserId(userId);
    return res.status(200).json({
      status: 200,
      message: "Task details fetched successfully",
      results: results,
    });
  } catch (error) {
    return res.status(500).send("Error fetching task details ");
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  const taskName = req.body.taskName;
  try {
    const results = await todoRepository.deleteTask(id, taskName);
    return res.status(200).json({
      status: 200,
      message: "task deleted successfully",
      results: results,
    });
  } catch (error) {
    return res.status(500).send("Error deleting task");
  }
};

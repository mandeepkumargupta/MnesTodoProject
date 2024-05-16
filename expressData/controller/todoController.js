const todoRepository = require("../repositories/todoRepository");
exports.addTask = async (req, res) => {
  const { taskName } = req.body;
  const task = { taskName };
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
    const results = await todoRepository.viewTask();
    return res.status(200).json({
      status: 200,
      message: "task fetching successfull",
      results: results,
    });
  } catch (error) {
    return res.status(500).send("Error viewing task");
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

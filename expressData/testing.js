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
/////////////////////////
/////////////////////////
exports.addTask = async (task) => {
  const query = "insert into todo set ?";
  try {
    const results = await queryAsync(query, task);
    return results;
  } catch (error) {
    throw error;
  }
};

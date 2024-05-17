const connection = require("../config/mysql");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

exports.addTask = async (task) => {
  const query = "insert into todo set ?";
  try {
    const results = await queryAsync(query, task);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.updateTask = async (isDone, id) => {
  query = "UPDATE todo SET isDone=? WHERE id=?";
  try {
    const results = await queryAsync(query, [isDone, id]);

    return results;
  } catch (error) {
    throw error;
  }
};
exports.viewTask = async () => {
  const query = "select * from todo";
  //const query = "select * from todo where id=?"; //changed version of upper line
  try {
    const results = await queryAsync(query);
    //const results = await queryAsync(query, id); //changed version of upper line
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getDataByUserId = async (userId) => {
  const query = "select * from todo where userId=?";
  try {
    const results = await queryAsync(query, userId);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.deleteTask = async (id, taskName) => {
  const query = "delete from todo where id=? AND taskName=?";
  try {
    const results = await queryAsync(query, [id, taskName]);
    return results;
  } catch (error) {
    throw error;
  }
};

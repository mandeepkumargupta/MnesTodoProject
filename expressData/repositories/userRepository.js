const connection = require("../config/mysql");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);
const bcrypt = require("bcrypt");

exports.addUser = async (credentials) => {
  const hashedPassword = await bcrypt.hash(credentials.password, 10);
  credentials.password = hashedPassword;
  const query = "insert into users set ?";
  try {
    const results = await queryAsync(query, credentials);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.getPasswordByUsername = async (username) => {
  const query = "select password from users where username=?";
  try {
    const results = await queryAsync(query, username);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.getDataByUsername = async (username) => {
  const query = "select * from users where username=?";
  try {
    const results = await queryAsync(query, username);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.getUserByUsernameAndPassword = async (username, password) => {
  //const results = await this.getDataByUsername(username); //
  //const hashedPassword = results.password; //
  const query = "select * from users where username=? AND password=?";
  try {
    const results = await queryAsync(query, [username, password]);
    return results;
  } catch (error) {
    throw error;
  }
};
// async function addUser(username, password) {
//   try {
//     const result = await new Promise((resolve, reject) => {
//       connection.query(
//         "insert into users (username,password) values(?,?)",
//         [username, password],
//         (err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//     });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

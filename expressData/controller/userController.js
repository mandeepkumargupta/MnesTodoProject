const userRepository = require("../repositories/userRepository");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const secretKey = "mySecretKey";
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const uniqueUserId = uuidv4();
  const { username, password } = req.body;
  const credentials = { username, password };
  credentials["uuid"] = uniqueUserId;

  try {
    await userRepository.addUser(credentials);
    return res.status(200).json({
      status: 200,
      message: "user registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Error registering user",
    });
  }
};
exports.getPasswordByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const results = await userRepository.getPassword(username);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send("Error retrieving data");
  }
};
exports.getDataByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const results = await userRepository.getDataByUsername(username);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send("Error retrieving data");
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const storedHashedPassword = await userRepository.getPasswordByUsername(
      username
    );

    if (!storedHashedPassword) {
      return res.status(401).json({
        status: 401,
        message: "Invalid username Please Register",
      });
    }

    const comp = await bcrypt.compare(
      password,
      storedHashedPassword[0].password
    );

    if (comp) {
      // Need to generate a jwt token with a payload of userId
      const tokenPayLoad = { uuid: uuidv4() };
      const token = jwt.sign(tokenPayLoad, secretKey);
      return res.status(200).json({
        status: 200,
        message: "Login successful",
        token: token,
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Error logging in",
    });
  }
};
// async function registerUser(req, res) {
//   const { username, password } = req.body;
//   try {
//     await userRepository.addUser(username, password);
//     res.status(200).json({
//       status: 200,
//       message: "user registered successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: 500,
//       message: "Error registering user",
//     });
//   }
// }

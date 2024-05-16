exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const storedHashedPassword = await userRepository.getPasswordByUsername(
    username
  );
  // console.log(storedHashedPassword[0].password);
  try {
    const comp = await bcrypt.compare(
      storedHashedPassword[0].password,
      password
    );
    console.log(comp);
    const result = await userRepository.getUserByUsernameAndPassword(
      username,
      password
    );
    if (result.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Login successful",
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

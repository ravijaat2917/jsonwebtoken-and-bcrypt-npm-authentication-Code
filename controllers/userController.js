import { hashPassword, matchPassword } from "../helpers/passwordHashing.js";
import { createToken7d } from "../helpers/jwtTokenGenerator.js";
import userModel from "../models/userModel.js";

class userController {
  // Homepage Function
  static homePage = (req, res) => {
    res.send("Welcome to HomePage");
  };

  // Registeration Function..........................................................................
  static registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    //Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "All Fields Required" });
    }
    // Check user is registered or new
    const found = await userModel.findOne({ email });
    if (found) {
      return res
        .status(400)
        .send({ status: false, message: "Email Alrready Registered..." });
    }

    // Hashing Password
    const hashPass = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      password: hashPass,
    }).save();
    res
      .status(200)
      .send({ status: true, message: "User Registered Successfully" });
  };

  // Login Function...................................................................................
  static login = async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "All fields Required" });
    }

    // Check email is registered
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: "Email Not Registered" });
    }
    const hashedPass = user.password;

    // Match Password
    const matched = await matchPassword(password, hashedPass);

    if (user.email === email && matched) {
      const token = await createToken7d(user._id);
      res
        .status(200)
        .send({ status: true, message: "Login Successfull", token });
    }
  };
}

export default userController;

import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
// This function is used to register a user
// It takes in the request and response objects as parameters
export const register = async (req, res) => {
  try {
    // Destructuring the required fields from the request body
    const { firstName, lastName, email, password, picturePath, friends, location, occupation } =
      req.body;

    // Generating salt for bcrypt
    const salt = await bcrpyt.genSalt(10);

    // Hashing the password with bcrypt
    const passwordHash = await bcrpyt.hash(password, salt);

    // Creating a new user object with the details
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 100000),
    });

    // Saving the user to the database
    const savedUser = await newUser.save();

    // Sending a 201 status code and the saved user object in the response
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGGING IN
// This function is used to log a user in
// It takes in the request and response objects as parameters
export const login = async (req, res) => {
  try {
    // Destructuring the email and password fields from the request body
    const { email, password } = req.body;

    // Destructuring the email and password fields from the request body
    const user = await User.findOne({ email: email });
    if (!user) {
      // If the user is not found, send a 400 status code with a message "User does not exist." in the response
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Checking if the password matches the hashed password stored in the database
    const isMatch = await bcrpyt.compare(password, user.password);

    // If the password does not match, send a 400 status code with a message "Invaild Credentials." in the response
    if (!isMatch) return res.status(400).json({ msg: "Invaild Credentials." });

    // Generating a JSON Web Token with the user id as the payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Generating a JSON Web Token with the user id as the payload
    delete user.password;

    // Sending a 200 status code with the token and user object in the response
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

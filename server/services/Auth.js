const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/index")
const User = mongoose.model("users")
const keys = require("../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { username, email, fullname, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        username,
        email,
        fullname,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};



const logout = async data => {
  try {
    const user = await User.findById(data._id);
    const token = "";
    return { token, loggedIn: false, ...user._doc };
  } catch (err) {
    throw err;
  }
};


const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const user = await User.findOne({ email: data.email });
    
    if (!user) {
      throw new Error("Incorrect email/password combination.");
    }
    let password_matches = await bcrypt.compareSync(
      data.password,
      user.password
    );

    if (password_matches) {
      const token = jwt.sign({ id: user._id }, keys.secretOrKey);

      return { token, loggedIn: true, ...user._doc, password: null };
    }
  } catch (err) {
    throw new Error(err);
  }
};

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};


module.exports = { register, logout, login, verifyUser};
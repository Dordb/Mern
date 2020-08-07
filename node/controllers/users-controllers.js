const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");
const User = require("../model/user");

async function getUsers(req, res, next) {
  let users;
  try {
    users = await User.find({}, "-password"); //exclure le pwd du find
  } catch (err) {
    return next(new HttpError("Fetching users failled", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
}

async function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed to signup, check your data", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signing up failed", 500));
  }

  if (existingUser) {
    return next(new HttpError("User already exists", 422));
  }

  const createdUser = new User({
    name,
    email,
    image: "URL imag",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Logging in failed", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Logging in failed, wrong email/pwd", 500));
  }

  res.json({
    message: "Logged In!",
    user: existingUser.toObject({ getters: true }),
  });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");

const DUMMY_USERS = [
  {
    id: "5",
    name: "do",
    places: 2,
    email: "a@b.fr",
    password: "azerty",
  },
  {
    id: "15",
    name: "doooo",
    places: 0,
    email: "test@test.fr",
    password: "azerty",
  },
];

function getUsers(req, res, next) {
  res.json({ users: DUMMY_USERS });
}
function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed to signup, check your data", 422)
    );
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    return next(new HttpError("Already Exists", 422));
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
}
function login(req, res, next) {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password != password) {
    return next(new HttpError("Could not identify user", 401));
  }
  res.json({ message: "Logged In!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

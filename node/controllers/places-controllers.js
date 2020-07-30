const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");
const Place = require("../model/place");

async function getPlaceById(req, res, next) {
  // !!!  if pid === user dans le cas d'un '/user/' ordre compte
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new Error("Something went wrong, could not find place", 404));
  }

  if (!place) {
    return next(new Error("Error not place found for place id", 404));
  }

  res.json({ place: place.toObject({ getters: true }) }); // => { place } => {place: place}
}

async function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(new Error("Something went wrong, could not find user", 404));
  }

  if (places.length === 0) {
    return next(new Error("Error place not found for user id", 404));
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
  // => { place } => { place: place }
}

async function createPlace(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://www.sortiraparis.com/images/80/83517/438334-visuel-paris-tour-eiffel-19.jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
}

async function updatePlace(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(HttpError("Invalid inputs passed, check your data", 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Find place failed", 500));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    return next(new HttpError("Updating place failed", 500));
  }
  res.status(201).json({ place: place.toObject({ getters: true }) });
}

async function deletePlace(req, res, next) {
  const placeId = req.params.pid;
  try {
    await Place.findById(placeId).deleteOne();
  } catch (err) {
    return next(new HttpError("Delete fail could not find place", 500));
  }

  res.status(200).json({ message: "** Deleted Place **" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

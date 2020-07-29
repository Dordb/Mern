const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");

const DUMMY_PLACES = [
  {
    id: "place1",
    title: "Tour 5",
    description: "Une Tour 5",
    imageUrl:
      "https://www.sortiraparis.com/images/80/83517/438334-visuel-paris-tour-eiffel-19.jpg",
    address: "5st rue de la pls",
    location: {
      lat: 40.7808,
      lng: -73.9772,
    },
    creator: "5",
  },
  {
    id: "place30",
    title: "Basment 0",
    description: "Un Basment",
    imageUrl:
      "https://www.basementwaterproofingetc.com/images/contemporary-basement.jpg",
    address: "Piiiilolloolo",
    location: {
      lat: 40,
      lng: 0,
    },
    creator: "5",
  },
  {
    id: "p1",
    title: "Basment zzzz",
    description: "Un Basment zzz",
    imageUrl:
      "https://www.basementwaterproofingetc.com/images/contemporary-basement.jpg",
    address: "Piiiilolloolo zzzz",
    location: {
      lat: 40,
      lng: 0,
    },
    creator: "1",
  },
];

function getPlaceById(req, res, next) {
  // !!!  if pid === user dans le cas d'un '/user/' ordre compte
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    return next(new Error("Error not place found for place id", 404));
  }
  res.json({ place }); // => { place } => {place: place}
}

function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (place.length === 0) {
    return next(new Error("Error not place found for user id", 404));
  }
  res.json({ place }); // => { place } => { place: place }
}

function createPlace(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
}

function updatePlace(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(HttpError("Invalid inputs passed, check your data", 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const index = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES.splice(index, 1, updatedPlace);
  res.status(200).json({ place: updatedPlace });
}

function deletePlace(req, res, next) {
  const placeId = req.params.pid;

  const index = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  if (index < 0) {
    return next(HttpError("*** Place not found ***", 404));
  }
  DUMMY_PLACES.splice(index, 1);
  res.status(200).json({ message: "** Deleted Place **" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

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
];

function UserPlaces(props) {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;

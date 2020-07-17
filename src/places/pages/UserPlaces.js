import React from "react";
import PlaceList from "../components/PlaceList";

function UserPlaces(props) {
  const DUMMY_PLACES = [
    {
      id: "place1",
      title: "Tour 5",
      description: "Une Tour 5",
      imageUrl:
        "https://www.sortiraparis.com/images/80/83517/438334-visuel-paris-tour-eiffel-19.jpg",
      address: "5st rue de la pls",
      location: {
        lat: 40,
        lng: -50,
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
        lat: 10,
        lng: -80,
      },
      creator: "5",
    },
  ];

  return <PlaceList items={DUMMY_PLACES} />;
}

export default UserPlaces;

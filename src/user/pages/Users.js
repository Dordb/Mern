import React from "react";
import UsersList from "../components/UsersList";

function Users() {
  const USERS = [
    {
      id: "5",
      name: "do",
      image:
        "https://image.shutterstock.com/image-photo/cropped-image-handsome-young-man-600w-708732331.jpg",
      places: 3,
    },
    {
      id: "15",
      name: "doooo",
      image:
        "https://image.shutterstock.com/image-photo/broun-dog-dachshund-sun-glasses-260nw-1660171375.jpg",
      places: 5,
    },
  ];
  return <UsersList items={USERS} />;
}

export default Users;

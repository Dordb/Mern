import React, { useState } from "react";

import Comp1 from "./Comp1";

import "./Main.css";
import NewGoal from "./NewGoal";

function Main() {
  const [courseGoals, setCourseGoals] = useState([
    { id: "n1", text: "Frererererer" },
    { id: "n2", text: "Mennnnnnn" },
    { id: "n3", text: "Frrrrrrrrr" },
  ]);

  function addNewGoalHandler(newGoal) {
    //setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(newGoal));
  }

  return (
    <div className="container">
      <NewGoal onAddGoal={addNewGoalHandler} />
      <Comp1 goals={courseGoals} />
    </div>
  );
}

export default Main;

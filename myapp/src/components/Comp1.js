import React from "react";

function Comp1(props) {
  return (
    <div>
      <ul>
        {props.goals.map((goal) => {
          return <li key={goal.id}>{[goal.text]}</li>;
        })}
      </ul>
    </div>
  );
}
export default Comp1;

import React from "react";
import Select from "react-select";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const Selector = ({ teams }) => {
  let options = [];
  teams.map((team) => {
    options.push({ value: team.city, label: team.city });
  });

  return (
    <div>
      <Select options={options} />
    </div>
  );
};

export default Selector;

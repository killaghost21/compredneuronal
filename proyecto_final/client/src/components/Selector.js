import React from "react";
import Select from "react-select";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const Selector = ({ teams }) => {
  let options = teams.map((team) => {
    return { value: team.city, label: team.city };
  });

  // const [clicks, setClicks] = useState(0);

  const changeSelect = (value) => {
    console.log("getchangeSelectValue", value);
    if (value.length > 0) {
      console.log("ok", value);
    }
    // setClicks(clicks + 1);
  };

  return (
    <div>
      <Select options={options} onChange={changeSelect} />
    </div>
  );
};

export default Selector;

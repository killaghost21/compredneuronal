import React, { useState, useContext } from "react";
import { Select } from "react-select-tile";
import { globalContext } from "./Context";

const Selector = ({ teams, id }) => {
  const context = useContext(globalContext);

  let options = teams.map((team) => {
    return { value: team.full_name, label: team.full_name };
  });

  const [value, setValue] = useState("");

  const handleItemClick = (value) => {
    setValue(value);
    context.setState({
      ...context.state,
      selector: { ...context.state.selector, [id]: value },
    });
  };

  return (
    <div>
      <Select
        placeholder="Please select ..."
        value={value}
        options={options}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default Selector;

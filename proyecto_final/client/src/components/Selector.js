import React, { useState } from "react";
import { Select } from "react-select-tile";

const Selector = ({ teams }) => {
  let options = teams.map((team) => {
    return { value: team.full_name, label: team.full_name };
  });

  const [value, setValue] = useState("");

  const handleItemClick = (value) => {
    setValue(value);
    // console.log(`Option selected:`, value);
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

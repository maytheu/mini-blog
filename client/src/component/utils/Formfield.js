import "./formfield.css";
import React from "react";

const Formfield = (props) => {
  return (
    <div>
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={(event) => props.change({ event, id: props.id })}
      />
    </div>
  );
};

export default Formfield;

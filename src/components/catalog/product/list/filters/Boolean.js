import React from "react";

const Boolean = (props) => {
  const filter = props.filter;
  const checkedHandle = (e) => {
    props.appliedFilers(
      e.target.name,
      e.target.checked,
      e.target.checked,
      "boolean"
    );
    //console.log(e.target.name, e.target.value, e.target.checked);
  };
  return (
    <div className="switch-holder">
      <div className="switch-toggle">
        <input
          type="checkbox"
          id={filter?.attribute_code}
          name={filter?.attribute_code}
          onChange={checkedHandle}
        />
        <label htmlFor={filter?.attribute_code}></label>
      </div>
    </div>
  );
};
export default Boolean;

import React from "react";
const Select = (props) => {
  const filter = props.filter;
  const checkedHandle = (e) => {
    props.appliedFilers(
      e.target.name,
      e.target.value,
      e.target.checked,
      "select"
    );
    //console.log(e.target.name, e.target.value, e.target.checked);
  };
  return (
    <ul className={"filter-" + filter?.attribute_code}>
      {filter?.options.map((option, index) => (
        <React.Fragment key={index}>
          {option.value !== "" && (
            <li className="colour-listItem">
              <input
                type="checkbox"
                name={filter?.attribute_code}
                value={option.value}
                id={option?.label}
                onChange={checkedHandle}
              />
              {filter?.attribute_code === "color" && (
                <span
                  className={`${option?.label.toLowerCase()} colour-label colour-colorDisplay`}
                  style={{ backgroundColor: option?.label }}
                ></span>
              )}
              <label htmlFor={option?.label}>{option?.label}</label>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Select;

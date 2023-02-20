import React from "react";
import Select from "./filters/Select";
import Boolean from "./filters/Boolean";

const Filters = (props) => {
  const allFilters = props?.filters || [];
  let selectedFilters = [];
  const filterHandler = (attribute, value, checked = false, type) => {
    if (checked) {
      selectedFilters.push({
        key: attribute,
        value: value,
      });
    } else {
      if (type === "boolean") {
        let unS = selectedFilters.findIndex((x) => x.key === attribute);
        if (unS > -1) {
          selectedFilters.splice(unS, 1);
        }
      } else {
        let unS = selectedFilters.findIndex((x) => x.value === value);
        if (unS > -1) {
          selectedFilters.splice(unS, 1);
        }
      }
    }

    let result = [];
    selectedFilters.map((y) => {
      let index = result.findIndex((x) => x.key === y.key);
      if (index == -1) {
        result.push({ key: y.key, values: [y.value] });
      } else {
        result[index].values.push(y.value);
      }
    });
    let i = 4;
    let searchCriteria = "";
    result.map((a, index) => {
      searchCriteria += `&searchCriteria[filter_groups][${i}][filters][${i}][field]=${
        a.key
      }&searchCriteria[filter_groups][${i}][filters][${i}][value]=${a.values.join()}&searchCriteria[filter_groups][${i}][filters][${i}][condition_type]=in`;
      i++;
    });
    props.appliedFilters(searchCriteria);
    //console.log(searchCriteria);
  };
  return (
    <div className="search-leftContainer">
      {allFilters.length > 0 && (
        <div>
          {allFilters.map((filter, index) => (
            <div className="vertical-filters-filters" key={index}>
              <span className="vertical-filters-header">
                {filter?.attribute_code}
              </span>
              {filter?.frontend_input === "select" && (
                <Select filter={filter} appliedFilers={filterHandler} />
              )}
              {filter?.frontend_input === "boolean" && (
                <Boolean filter={filter} appliedFilers={filterHandler} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;

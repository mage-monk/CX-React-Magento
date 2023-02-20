import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Accordion from "react-bootstrap/Accordion";

import Parser from "html-react-parser";

const TabList = (props) => {
  const attributes = props.productAttributes;
  const tabs = [];
  if (attributes !== undefined && attributes.length > 0) {
    attributes.map((attribute) => {
      if (
        attribute.attribute_code === "short_description" ||
        attribute.attribute_code === "description"
      ) {
        tabs.push({ code: attribute.attribute_code, content: attribute.value });
      }
    });
  }
  return (
    attributes !== undefined &&
    tabs.length > 0 && (
      <Accordion defaultActiveKey="0" flush>
        {tabs.map((tab, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{`${tab.code
              .toUpperCase()
              .replace("_", " ")}`}</Accordion.Header>
            <Accordion.Body>{Parser(tab.content)}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  );
};

export default TabList;

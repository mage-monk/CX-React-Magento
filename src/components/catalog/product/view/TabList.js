import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
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
      <div style={{ display: "block", width: "100%", padding: 30 }}>
        <Tabs defaultActiveKey="0">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.code}
              eventKey={index}
              title={`${tab.code.toUpperCase().replace("_", " ")}`}
              content={tab.content}
            >
              {Parser(tab.content)}
            </Tab>
          ))}
        </Tabs>
      </div>
    )
  );
};

export default TabList;

import React, { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
const ToTop = () => {
  const [top, setTop] = useState(false);
  window.addEventListener("scroll", (e) => {
    const position = window.pageYOffset;
    if (position >= 300) {
      setTop(true);
    } else {
      setTop(false);
    }
    //console.log(position);
  });
  const scrollToToHandle = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <a
      onClick={scrollToToHandle}
      className={`scroll-to-top ${top ? "scrolled" : ""}`}
    >
      <MdKeyboardArrowUp size={30} />
    </a>
  );
};

export default ToTop;

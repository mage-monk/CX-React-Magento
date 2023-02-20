import React from "react";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

const Share = (props) => {
  return (
    <div className="pt-24 pb-24  between-xs">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${props.url}`}
        target="_blank"
      >
        <FacebookIcon size={32} round={true} style={{ marginRight: "5px" }} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${props.url}`}
        target="_blank"
      >
        <TwitterIcon size={32} round={true} style={{ marginRight: "5px" }} />
      </a>

      <a
        href={`https://web.whatsapp.com/send?text=${props.url}`}
        target="_blank"
      >
        <WhatsappIcon size={32} round={true} style={{ marginRight: "5px" }} />
      </a>
    </div>
  );
};
export default Share;

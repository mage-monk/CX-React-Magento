const OpenLink = (props) => {
  const link = props.step.metadata.link || "";
  const text = props.step.metadata.text || "";
  return (
    <a href={link} target="_blank">
      {text}
    </a>
  );
};

export default OpenLink;

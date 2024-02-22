import React from "react";

const Todocontainer = (props) => {
  return <div className="w-[35rem]  mx-auto p-5 rounded">{props.children}</div>;
};

export default Todocontainer;

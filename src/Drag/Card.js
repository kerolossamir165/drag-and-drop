import React from "react";
import Draggable from "react-draggable";
import ConnectPointsWrapper from "./Point";
import deBounce from "./helper";

let styles = {
  width: "150px",
  cursor: "move",
  padding: "20px",
  textAlign: "center",
  background: "#e5e5e5",
  position: "absolute",
  zIndex: 50000,
};

let CardDrag = ({ data, boxId, addArrow, setArrows, upDateElemtent }) => {
  let boxRef = React.useRef();
  let dragRef = React.useRef();

  let [dimention, setDimention] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    let deBounceed = deBounce(function () {
      setDimention({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setArrows((arrows) => {
        return [...arrows];
      });
    }, 50);

    window.addEventListener("resize", deBounceed);

    return () => window.removeEventListener("resize", deBounceed);
  }, [dimention, setArrows]);

  let { text, x, y } = data;
  return (
    <Draggable
      position={{
        x: x,
        y: y,
      }}
      ref={dragRef}
      onDrag={(e, data: Object) => {
        // to control the following of the arrow when drag the box
        setArrows((arrows) => {
          return [...arrows];
        });

        upDateElemtent(e.target.id, e, data);
      }}
    >
      <div
        id={boxId}
        ref={boxRef}
        style={{ ...styles }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (e.dataTransfer.getData("arrow") === boxId) {
            console.log(e.dataTransfer.getData("arrow"), boxId);
          } else {
            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
            addArrow(refs);
          }
        }}
      >
        {text}
        <ConnectPointsWrapper {...{ boxId, dragRef, boxRef }} />
      </div>
    </Draggable>
  );
};

export default CardDrag;

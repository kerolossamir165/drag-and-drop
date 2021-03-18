import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";

const connectPointStyle = {
  position: "absolute",
  width: 15,
  height: 15,
  border: "1px solid #000 ",
  borderRadius: "50%",
};

let left = { left: 0, top: "50%", transform: "translate(-50%, -50%)" };
let right = { right: -15, top: "50%", transform: "translate(-50%, -50%)" };

const ConnectPointsWrapper = ({ boxId, dragRef, boxRef }) => {
  //referecne to the div point
  const ref1 = useRef();

  const [position, setPosition] = useState({});
  // const [beingDragged1, setBeingDragged1] = useState(false);
  const [beingDragged2, setBeingDragged2] = useState(false);

  return (
    <React.Fragment>
      <div
        className="connectPoint "
        style={{
          ...connectPointStyle,

          background: "white",
          ...left,
          ...position,
        }}
        draggable={false}
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          // setBeingDragged1(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={(e) => {
          const { offsetTop, offsetLeft } = boxRef.current;
          const { x, y } = dragRef.current.state;

          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0.6,
          });
        }}
        ref={ref1}
        onDragEnd={(e) => {
          setPosition({});

          // setBeingDragged1(false);
        }}
      />
      {/* {beingDragged1 ? (
        <Xarrow
          start={boxId}
          lineColor="black"
          headColor="black"
          strokeWidth={2}
          headSize={1}
          end={ref1}
          endAnchor="left"
          startAnchor="left"
        />
      ) : null} */}

      <div
        className="connectPoint"
        style={{
          ...connectPointStyle,

          background: "black",
          ...right,
          ...position,
        }}
        draggable
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          setBeingDragged2(true);

          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={(e) => {
          const { offsetTop, offsetLeft } = boxRef.current;
          const { x, y } = dragRef.current.state;
          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0.5,
          });
        }}
        ref={ref1}
        onDragEnd={(e) => {
          setPosition({});
          setBeingDragged2(false);
        }}
      />

      {beingDragged2 ? (
        <Xarrow
          start={boxId}
          lineColor="black"
          headColor="black"
          strokeWidth={2}
          headSize={1}
          end={ref1}
        />
      ) : null}
    </React.Fragment>
  );
};

export default ConnectPointsWrapper;

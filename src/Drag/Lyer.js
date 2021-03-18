import React, { useState } from "react";
import Xarrow from "react-xarrows";
import "./point.css";

import CardDrag from "./Card";

let LayOut = ({ elementns, arrows, setArrows, addArrow, upDateElemtent }) => {
  return (
    <React.Fragment>
      <div
        style={{
          border: "1px solid #f44336",
          width: "88%",
          height: "90vh",
          overflow: "scroll",
          marginLeft: "10px",
        }}
      >
        {" "}
        {elementns.length === 0
          ? null
          : elementns.map((el, i) => {
              return (
                <CardDrag
                  key={el.id}
                  bounds="parent"
                  data={el}
                  {...{ addArrow, setArrows, boxId: el.id, upDateElemtent }}
                />
              );
            })}
        <React.Fragment>
          {arrows.map((ar) => {
            return (
              <Xarrow
                start={ar.start}
                end={ar.end}
                path="smooth"
                key={ar.start + "-" + ar.end}
                headSize={4}
                headColor="black"
                lineColor="black"
                strokeWidth={2}
                endAnchor="left"
                startAnchor="right"
              />
            );
          })}
        </React.Fragment>
      </div>
      {/* <div
        className="arrows"
        style={{
          border: "1px solid #ff0",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      > */}
      {/* <React.Fragment>
        {arrows.map((ar) => {
          return (
            <Xarrow
              start={ar.start}
              end={ar.end}
              path="smooth"
              key={ar.start + "-" + ar.end}
              className="mutate-arrow"
              headSize={3}
              endAnchor="left"
              startAnchor="right"
            />
          );
        })}
      </React.Fragment> */}
    </React.Fragment>
    // </div>
  );
};

export default LayOut;

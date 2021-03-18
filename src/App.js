import React from "react";
import Draggable from "react-draggable";
import LayOut from "./Drag/Lyer";
import uuid from "react-uuid";
import "./App.css";

let styles = {
  width: "150px",
  cursor: "move",
  padding: "20px",
  textAlign: "center",
  background: "#e5e5e5",
  position: "relative",
};

/********************************************** */
let useLocalStorage = (
  key,
  defaultValue = "",
  { serialize = JSON.stringify, deSerialize = JSON.parse } = {}
) => {
  let [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);

    if (valueInLocalStorage) {
      return deSerialize(valueInLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  let prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    let prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [state, serialize, key]);

  return [state, setState];
};

/************************************ */

function App() {
  // let [elementns, setElement] = React.useState([]);
  const [elementns, setElement] = useLocalStorage("elements", []);

  // const [arrows, setArrows] = React.useState([]);
  const [arrows, setArrows] = useLocalStorage("arrow", []);

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  function handelElement(ele, data) {
    let rect = ele.target.getBoundingClientRect();

    let { pageX, pageY } = ele;

    let { x, y } = data;

    let { innerText, offsetHeight, offsetWidth } = data.node;

    // let left = ele.pageX - offsetX - offsetWidth;
    // let top = ele.pageY - offsetY - offsetHeight;

    setElement((prev) => {
      return [
        ...prev,
        {
          x,
          y,
          text: innerText,
          pageX,
          pageY,
          offsetHeight,
          offsetWidth,
          id: uuid(),
        },
      ];
    });
  }

  function upDateElemtent(id, ele, data) {
    // let ele = elementns.find((el) => el.id === id);
    let { x, y } = data;
    let { innerText, offsetHeight, offsetWidth } = data.node;
    let { pageX, pageY, offsetX, offsetY } = ele;

    const newElements = elementns.map((ele) =>
      ele.id === id
        ? { ...ele, x, y, offsetHeight, offsetWidth, pageX, pageY }
        : ele
    );

    setElement(newElements);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "1px solid #f00", height: "90vh", width: "200px" }}>
        <Draggable
          onStop={(e, data: Object) => {
            if (e.clientX > 300) {
              console.log(e);
              handelElement(e, data);
            }
          }}
          position={{ x: 10, y: 10 }}
        >
          <div style={{ ...styles, boxSizing: "border-box" }}>
            Hello Drag 💕
          </div>
        </Draggable>
        <Draggable
          onStop={(e, data: Object) => {
            if (e.clientX > 300) {
              handelElement(e, data);
            }
          }}
          position={{ x: 10, y: 40 }}
        >
          <div style={styles}>Hello Drag 2 👌</div>
        </Draggable>
      </div>
      <LayOut
        elementns={elementns}
        arrows={arrows}
        setArrows={setArrows}
        addArrow={addArrow}
        upDateElemtent={upDateElemtent}
      />
    </div>
  );
}

export default App;

import React, { useState, useRef, useEffect } from "react";

const ListComponent = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const items = [
    "ელემენტი 1",
    "ელემენტი 2",
    "ელემენტი 3",
    "ელემენტი 4",
    "ელემენტი 5",
    "ელემენტი 6",
  ];

  const listRef = useRef();
  const contextMenuRef = useRef();

  const handleRightClick = (event, text) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      text,
    });
  };

  const handleAction = (action) => {
    console.log(action);
    setContextMenu({ ...contextMenu, visible: false });
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (
        contextMenu.visible &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextMenu]);

  return (
    <div
      ref={listRef}
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        padding: "10px",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#e0e0e0",
              cursor: "pointer",
            }}
            onContextMenu={(e) => handleRightClick(e, item)}
          >
            {item}
          </li>
        ))}
      </ul>
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "#e5e5e5",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <p>{contextMenu.text}</p>
          <button
            style={{
              margin: "5px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
            onClick={() => handleAction("edit")}
          >
            Edit
          </button>
          <button
            style={{
              margin: "5px",
              backgroundColor: "#DC3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
            onClick={() => handleAction("remove")}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ListComponent;

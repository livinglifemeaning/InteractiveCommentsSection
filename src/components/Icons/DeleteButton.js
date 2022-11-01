import { useState } from "react";

const DeleteButton = () => {
  const [color, setColor] = useState("hsl(358 79% 66%)");
  const hoverColorHandler = () => {
    setColor("hsl(357 100% 86%)");
  };
  const resetColorHandler = () => {
    setColor("hsl(358 79% 66%)");
  };

  return (
    <div onMouseOver={hoverColorHandler} onMouseLeave={resetColorHandler} className="icon delete">
      <span>
      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill={color}/></svg>
      </span>

      Delete
    </div>
  );
};

export default DeleteButton;

import { useEffect, useState } from "react";

const MinusIcon = (id) => {
  const [color, setColor] = useState("#C5C6EF");
  const hoverColorHandler = () => {
    setColor("hsl(238 40% 52%)");
  };
  const resetColorHandler = () => {
    setColor("#C5C6EF");
  };
  const likedStatus = JSON.parse(localStorage.getItem(`${id.id}`));

  useEffect(() => {
    if (likedStatus) {
      if (likedStatus.hasBeenDisliked) {
        setColor("hsl(358 79% 66%)");
      } else {
        setColor("#C5C6EF");
      }
    }
  }, [likedStatus]);
  return (
    <div onMouseOver={hoverColorHandler} onMouseLeave={resetColorHandler}>
      <svg width="11" height="6" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default MinusIcon;

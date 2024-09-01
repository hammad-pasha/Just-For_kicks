import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { priceSortData } from "../../static/data";

export const ShoeSizeDropDown = ({ shoeSizeData, setShoeSizeDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?shoe_size=${i.size}`);
    setShoeSizeDropDown(false);
    window.location.reload();
  };
  return (
    <div className="w-full bg-gray-200 absolute z-30 rounded-b-md shadow-sm">
      {shoeSizeData &&
        shoeSizeData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(i)}
          >
            <h3 className="p-4 cursor-pointer hover:bg-slate-300 w-full select-none">
              {i.size}
            </h3>
          </div>
        ))}
    </div>
  );
};

export const PriceDropDown = ({ setShowPriceDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (value) => {
    navigate(`/products?price=${value}`);
    setShowPriceDropDown(false);
    window.location.reload();
  };
  return (
    <div className="w-full bg-gray-200 absolute z-30 rounded-b-md shadow-sm">
      {priceSortData.map((i) => (
        <div
          key={i.value}
          className={`${styles.noramlFlex}`}
          onClick={() => submitHandle(i.value)}
        >
          <h3 className="p-4 cursor-pointer hover:bg-slate-300 w-full select-none">
            {i.label}
          </h3>
        </div>
      ))}
    </div>
  );
};

export const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="w-full bg-gray-200 absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 w-full select-none"
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3>{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

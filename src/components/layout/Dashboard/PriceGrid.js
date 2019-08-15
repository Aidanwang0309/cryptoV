import React from "react";
import PriceGridItem from "./PriceGridItem";

const PriceGrid = props => {
  const { price } = props;
  const sym = Object.keys(price)[0];
  const data = price[sym]["USD"];

  return (
    <PriceGridItem
      logo={data.IMAGEURL}
      name={sym}
      changeRate={data.CHANGEPCT24HOUR}
      price={data.PRICE}
    />
  );
};

export default PriceGrid;

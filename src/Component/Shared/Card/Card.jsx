/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "semantic-ui-react";

const ProductCard = (props) => {
  return (
    <Card
      link
      header={"Product Address " + props.data}
      meta="Product created by you"
      fluid
      style={{ marginTop: "10px" }}
      description={["head in to see your product review status !!"].join("")}
    />
  );
};

export default ProductCard;
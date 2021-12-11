/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import React from "react";
import "./ProductCard.scss";
import { Card } from "semantic-ui-react";

const IdeaCard = (props) => {
  console.log(" this is props ", props);
  return (
    <Card link>
      <img
        src={"/asset/images/idea.png"}
        style={{ height: "300px", width: "290px" }}
        alt="card"
      />
      <Card.Content>
        <Card.Header>
            {props.data.productInfo[0]}
            </Card.Header>
        <Card.Description>
          Creator: {props.data.productInfo[1].slice(0, 20) + "..."}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default IdeaCard;
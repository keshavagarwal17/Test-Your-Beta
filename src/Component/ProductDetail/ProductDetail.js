import React, { useEffect, useState, useContext } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router";
import {
  Container,
  Segment,
  Header,
  Button,
  Modal,
  Form,
  Icon,
  Dropdown,
  Label
} from "semantic-ui-react";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [openRatingModel, setOpenRatingModel] = useState(false);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <Toaster />
      <Container style={{ marginTop: "20px" }}>
        <Segment>
          <b>Title: </b>
          Title
        </Segment>
        <Segment>
          <b>Description along with installation and usage: </b> <br />
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(
              "<h1> this will be description</h1>"
            )}
          ></div>
        </Segment>
        <Segment>
          <b>Link to Product: </b> <br />
        </Segment>
        <Segment>
          <b>Amount:</b> 1eth
        </Segment>
        <Header as="h1">All Reviews</Header>
        <Segment>
          <Button
            color="youtube"
            floated="right"
            onClick={() => setOpenRatingModel(true)}
          >
            Rate this Review
          </Button>
          <p>
            <b>User : </b> abrakadabra
          </p>
          <p>
            <b>Rating he/she has given to your product : </b> -10
          </p>
          <Button color="blue" onClick={() => setOpen(true)}>
            View Full Review
          </Button>
        </Segment>
        <Segment>
            <Label as='a' color='teal' ribbon='right'>
            Review Rating: 5
            </Label>
          <p>
            <b>User : </b> abrakadabra
          </p>
          <p>
            <b>Rating he/she has given to your product : </b> -10
          </p>
          <Button color="blue" onClick={() => setOpen(true)}>
            View Full Review
          </Button>
        </Segment>
        <Modal
          closeIcon
          open={openRatingModel}
          onClose={() => setOpenRatingModel(false)}
          onOpen={() => setOpenRatingModel(true)}
        >
          <Header as="h3" content="Review Rating" />
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>
                  How much you will rate this review in the range of 0 to 10(0
                  for worst and 10 for best)
                </label>
                <input
                  name="rating"
                  type="number"
                  onChange={(e) => console.log(e)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button
                color="green"
              >
                Give Rating
              </Button>
            </Modal.Actions>
        </Modal>
        <Modal
          closeIcon
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Header as="h2" content="User Review" />
          <Modal.Content>
            <h3> Best part of our product which you like </h3>
            <p>Nothing is good</p>
            <h3> What can be improved further </h3>
            <p>
              You should scrap out your whole idea, this is the least you can
              do.
            </p>
            <h3> Did it stuck any where while using it </h3>
            <p>question should be like this "did it work any where?"</p>
            <h3> How much you will rate on rating on 10 </h3>
            <p>-10</p>
            <h3> Would you recommend this to your friend </h3>
            <p>Never ever</p>
            <h3>
              {" "}
              If you find any bug do mention it along with it's screenshots{" "}
            </h3>
            <p>your product is not a product it is just a collection of bug</p>
          </Modal.Content>
        </Modal>
      </Container>
    </>
  );
};

export default ProductDetail;
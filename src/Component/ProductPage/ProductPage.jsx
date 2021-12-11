import React, { useEffect, useState, useContext } from "react";
import "./ProductPage.scss";
import { useParams } from "react-router";
import {
  Container,
  Segment,
  Header,
  Button,
  Modal,
  Form,
  Icon,
  Dropdown
} from "semantic-ui-react";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";
import { EditorState } from "draft-js";
// import { options } from "../../../Content/Profile";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { create } from "ipfs-http-client";
import IPFS from "ipfs-mini";



const IdeaPage = () => {
    const [client, setClient] = useState(null);
    const [open, setOpen] = useState(false)
    const [ipfsInstance, setIpfsInstance] = useState(null);
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [review, setReview] = useState({
    bestpart: '',
    improvement: '',
    stuck: '',
    rating: 0,
    recommend: '',
    bug: ''
  })

  useEffect(() => {
    const ipfs = new IPFS({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https"
    });
    setIpfsInstance(ipfs);
  },[])

  const setReviewValues = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    console.log("setting review", review)
  };

    const setDropdownValues = (e, data) => {
    setReview({ ...review, [data.name]: data.value });
  };


  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log(convertedContent);
  };
  const boolOptions = [
    { key: "yes", text: "yes" },
    { key: "no", text: "no" }
  ]
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const addReview = async () => {
    setReview({
      ...review, bug: convertedContent
    })
    const reviewId = await ipfsInstance.addJSON(review);
    console.log("cid", reviewId)
    console.log("final review", reviewId)
  }

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
            dangerouslySetInnerHTML={createMarkup("<h1> this will be description</h1>")}
          ></div>
        </Segment>
        <Segment>
          <b>Link to Product: </b> <br />
        </Segment>
        <Segment>
          <b>Managed by:</b> fjhkfghsdgkjfhgfjgk
        </Segment>
        {/* <Header as="h1">All Reviews</Header> */}
        <Segment>
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button color="green" icon="add">
                Add your review
              </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header as="h2" content="Add your review" />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label> Best part of our product which you like </label>
                  <textarea
                    name="bestpart"
                    type="text"
                    onChange={(e) =>
                      setReviewValues(e)
                    }
                  />
                  <label> What can be improved further </label>
                  <textarea
                    name="improvement"
                    type="text"
                    onChange={(e) =>
                      setReviewValues(e)
                    }
                  />
                  
                  <label> Did it stuck any where while using it </label>
                  <textarea
                    name="stuck"
                    type="text"
                    onChange={(e) => setReviewValues(e)}
                  />
                  
                  <label> How much you will rate on rating on 10 </label>
                  <input
                    name="rating"
                    type="number"
                    onChange={(e) =>
                      setReviewValues(e)
                    }
                  />
                  
                  <label> Would you recommend this to your friend </label>
                  <Dropdown
                placeholder="select"
                name="recommend"
                fluid
                selection
                clearable
                onChange={(e, data) => setDropdownValues(e, data)}
                options={boolOptions}
              />
                  
                  <label> If you find any bug do mention it along with it's screenshots </label>
                  <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => addReview()}
              >
                <Icon name="add" /> Add Review
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </Container>
    </>
  );
};

export default IdeaPage;
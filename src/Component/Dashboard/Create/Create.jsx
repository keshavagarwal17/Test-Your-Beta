import React, { useState } from "react";
import {
  Container,
  Segment,
  Form,
  Button,
  Dropdown,
  Input,
  Message,
} from "semantic-ui-react";
import { EditorState } from "draft-js";
// import { options } from "../../../Content/Profile";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Create.scss";
import { useHistory } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Create = () => {

   const genderOptions = [
       { key: "male", text: "male" },
       { key: "female", text: "female" },
   ]

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  return (
    <>
      <Container>
        <Toaster />
        <Segment>
          Few things to note before describing your product
          <ul>
            <li>Write your statements to the point avoid using heavy jargon</li>
            <li>Use media to explain your idea in a better way.</li>
            <li>
              Involvement of facts and figure makes your idea more authentic
            </li>
            <li>
              Aim for a solution approaching description while writing about
              your idea.
            </li>
          </ul>
        </Segment>
        <Segment>
          <Form
        //    error={!!errMessage}
          >
            <Form.Field>
              <label>Enter your product title </label>
              <input
                name="title"
                placeholder="product title"
                // onChange={(e) => setEssentialValues(e)}
              />
            </Form.Field>

            <Form.Field>
              <label>Describe your product along with installation process: </label>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="min age"
                name="ageMin"
                // onChange={(e) => setEssentialValues(e)}
                placeholder="Enter age lower bound"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="ageMax"
                label="max age"
                // onChange={(e) => setEssentialValues(e)}
                placeholder="Enter age upper bound"
              />
            </Form.Group>
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="amount"
                label="amount to disburse"
                // onChange={(e) => setEssentialValues(e)}
                placeholder="Enter amount to disburse"
                type="number"
              />
            <Dropdown
                placeholder="select your gender"
                name="gender"
                fluid
                search
                selection
                // onChange={(e, data) => setDropdownValues(e, data)}
                options={genderOptions}
              />
            <Message error header="Oops!" 
            // content={errMessage}
             />
          </Form>
          <Button
            primary
            content="deploy"
            icon="save"
            style={{ marginTop: "20px" }}
          />
          <Button
            primary
            icon="backward"
            style={{ marginTop: "20px" }}
            size="large"
            floated="right"
          />
        </Segment>
      </Container>
    </>
  );
};

export default Create;
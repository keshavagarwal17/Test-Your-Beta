import React, { useState, useEffect } from "react";
import {
  Container,
  Segment,
  Form,
  Button,
  Dropdown,
  Input,
  Message,
  Select,
} from "semantic-ui-react";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Create.scss";
import { useHistory } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import web3 from "../../../ethereum/web3";
import company from "../../../ethereum/company";

const Create = () => {
  const [account, setAccount] = useState("");

  const setCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    setCurrentAccount();
  }, []);

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [product, setProduct] = useState({
    title: "no title",
    ageMin: "1",
    ageMax: "100",
    link: "no link",
    desc: "this is desp",
    amt: "100",
    gender: "male",
    responses: "5",
  });

  const setProductValues = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log("setting review", product);
  };

  const setDropdownValues = (e, data) => {
    console.log(data.name, data.value);
    setProduct({ ...product, [data.name]: data.value });
  };

  const deployProduct = async () => {
    try {
      console.log(product);
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0], company.methods);
      let data = await company.methods
        .addAProduct(
          product.title,
          convertedContent ? convertedContent : "no description",
          product.link,
          product.responses,
          product.amt,
          product.ageMin,
          product.ageMax,
          product.gender
        )
        .send({
          from: account,
        });
      console.log("this is return data", data);
      toast.success("Success fully deployed product !!");
      setLoading(false);
      // }
    } catch (err) {
      console.log(err);
      console.log("this err occured ", err.message);
      toast.error("Probably it didn't worked !!");
      setErrMessage(err);
    }
  };

  const genderOptions = [
    { key: "male", text: "male", value: "male" },
    { key: "female", text: "female", value: "female" },
    { key: "both", text: "both", value: "both" },
    { key: "no", text: "No gender preference", value: "no" },
  ];

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

  //   Name, categories, -age, -gender, -product description, product (link, apk, installation file), product-usage doc, total budget

  return (
    <>
      <Container>
        <Toaster />
        <Segment>
          Few things to note before describing your product
          <ul>
            <li>Write your statements to the point avoid using heavy jargon</li>
            <li>Use media to explain your product in a better way.</li>
            <li>Do write installation steps if needed</li>
            <li>All fields are necessary to fill</li>
          </ul>
        </Segment>
        <Segment>
          <Form error={!!errMessage}>
            <Form.Field>
              <label>Enter your product title </label>
              <input
                name="title"
                placeholder="product title"
                onChange={(e) => setProductValues(e)}
              />
            </Form.Field>

            <Form.Field>
              <label>
                Describe your product along with installation process and usage:{" "}
              </label>
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
                onChange={(e) => setProductValues(e)}
                placeholder="Enter age lower bound"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="ageMax"
                label="max age"
                onChange={(e) => setProductValues(e)}
                placeholder="Enter age upper bound"
              />
            </Form.Group>
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              name="responses"
              label="No of responses"
              onChange={(e) => setProductValues(e)}
              placeholder="No of responses you want"
              type="number"
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              name="link"
              label="Link to your product"
              onChange={(e) => setProductValues(e)}
              placeholder="Reference to where we can find your product"
              type="text"
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              name="amount"
              label="amount to disburse (Enter in micro ether)"
              onChange={(e) => setProductValues(e)}
              placeholder="Enter amount to disburse"
              type="number"
            />
            <label> Select the gender preference (if any) </label>
            <Dropdown
              placeholder="select your gender"
              name="gender"
              fluid
              search
              selection
              onChange={(e, data) => setDropdownValues(e, data)}
              options={genderOptions}
            />
            <Message error header="Oops!" content={errMessage} />
          </Form>
          <Button
            primary
            content="deploy"
            icon="save"
            loading={loading}
            onClick={() => deployProduct()}
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

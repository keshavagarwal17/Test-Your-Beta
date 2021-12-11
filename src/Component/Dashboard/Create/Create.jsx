import React, { useState, useEffect } from "react";
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
import instance from '../../../ethereum/company'
import { useHistory } from "react-router";
import toast, { Toaster } from "react-hot-toast";
// const Web3 = require("web3")
// const ContractKit = require('@celo/contractkit')

// 2. Import the getAccount function
// const getAccount = require('./getAccount').getAccount

// 3. Init a new kit, connected to the alfajores testnet
// const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
// const kit = ContractKit.newKitFromWeb3(web3)

const Create = () => {



  const saveToCelo = async () => {
    // let account = await getAccount()

    // Add your account to ContractKit to sign transactions
    // This account must have a CELO balance to pay tx fees, get some at https://celo.org/build/faucet
    try {
      // kit.connection.addAccount('f8f15a4dfdde36f59ad832f958dededc4ece6d406bbc04c98747d564b7cf64a7')
      // const txObject = await instance.methods.addAProduct("fdfd","fdfd","fdfd",1,2)
      // let tx = await kit.sendTransactionObject(txObject, { from: '0x276A42eAc323740916De9829b1cA291c283b17fe' })
  
      // let receipt = await tx.waitReceipt()
      // console.log("receipt received",receipt)
    } catch(err) {
      console.log(err.message)
    }

  }
  useEffect(()=> {
    console.log(instance)
  saveToCelo()

  },[])
  // let account = await getAccount()

  // // Add your account to ContractKit to sign transactions
  // // This account must have a CELO balance to pay tx fees, get some at https://celo.org/build/faucet
  // kit.connection.addAccount(account.privateKey)
  // const txObject = await instance.methods.setName(newName)
  // let tx = await kit.sendTransactionObject(txObject, { from: account.address })

  // let receipt = await tx.waitReceipt()
  // console.log(receipt)

   const genderOptions = [
       { key: "male", text: "male" },
       { key: "female", text: "female" },
       { key: "both", text: "both" },
       { key: "no", text: "No gender preference" },
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
            <li>
                Do write installation steps if needed
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
              <label>Describe your product along with installation process and usage: </label>
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
                name="link"
                label="Link to your product"
                // onChange={(e) => setEssentialValues(e)}
                placeholder="Reference to where we can find your product"
                type="text"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="amount"
                label="amount to disburse"
                // onChange={(e) => setEssentialValues(e)}
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
            onClick={() => saveToCelo()}
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
import React, { useEffect, useState, useContext } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Segment,
  Header,
  Button,
  Modal,
  Form,
  Icon,
  Dropdown,
  Input
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
import product from "../../ethereum/product";
import web3 from '../../ethereum/web3'
import Review from './Review/Review'

const ProductPage = () => {
    const [client, setClient] = useState(null);
    const [open, setOpen] = useState(false)
    const [ipfsInstance, setIpfsInstance] = useState(null);
    const [allReviewers, setAllReviewers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reviewLen, setReviewLen] = useState(0);
    const [currentAddress, setCurrentAddress] = useState("");
    const { productAddress } = useParams();
    const [addingMoney, setAddingMoney] = useState(false)
    const [balance, setBalance] = useState(0) 
    // const [review, setReview] = useState({ title: "", description: "" });
    const [productInstance, setProductInstance] = useState();
    const [allReviews, setALlReviews] = useState([]);
    const [productSummary, setProductSummary] = useState({
      title: '',
      link: '',
      descp: '',
      amt: '',
      reviewLength: '',
      manager: ''
    });
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [currentAccount, setCurrentAccount] = useState("");

  const setAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);
   }

  useEffect(() => {
    setAccount()
  },[])

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

  useEffect(() => {
    try {
      console.log(" this is called ", reviewLen);
      const reviews = [];
      const reviewLengthArray = Array.from(
        Array(reviewLen).keys()
      );
      console.log(reviewLengthArray, productSummary.reviewLength);
      const productInstance = product(productAddress);
      reviewLengthArray.map(async (i) => {
        
        const particularReview = await productInstance.methods.reviews(i).call();
        reviews.push(particularReview);
        console.log(particularReview);
        setALlReviews((allReviews) => [...allReviews, particularReview]);
      });
      // setALlReviews(reviews)
      console.log(allReviews)
    } catch (err) {
      console.log(err.message);
    }
  }, [reviewLen]);

  const setProduct = async () => {
       // console.log(" this is user age ", age);
       setCurrentAddress(productAddress);
       console.log(currentAddress);
       console.log(productAddress)
       const productInstance = product(productAddress);
       setProductInstance(productInstance);
       const productInfo = await productInstance.methods.getSummary().call();
       console.log(productInfo)
       const addressOfReviewers = await productInstance.methods.getAllReviewers().call();
       setAllReviewers(addressOfReviewers);
       setProductSummary({
        title: productInfo[0],
        description: productInfo[1],
        link: productInfo[2],
        amt: productInfo[7],
        reviewLength: productInfo[8],
        manager: productInfo[9]
      });
      const balance = await productInstance.methods.currentBalance().call()
      console.log("this is balance", balance)
      setBalance(balance)
       console.log("this are address opf reviews", addressOfReviewers)
       setReviewLen(addressOfReviewers.length)
      // getCurrentBalance()
  }

  useEffect(() => {
    setProduct()
  }, []);

  const setReviewValues = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    console.log("setting review", review)
  };

    const setDropdownValues = (e, data) => {
    setReview({ ...review, [data.name]: data.value });
  };

  // const getCurrentBalance = async () =>{
  //   try {
  //     const balance = await productInstance.methods.currentBalance().call()
  //     console.log("this is balance", balance)
  //     setBalance(balance)
  //   } catch(err) {
  //     console.log(err.message)
  //   }
  // }


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

  const addBalanceToProduct = async () => {
    try {
      setAddingMoney(true)
      
      await productInstance.methods.addBalance().send({
        from: currentAccount,
        value: productSummary.amt
      })
      toast.success("Balance added")
      setAddingMoney(false)
    } catch(err){
      console.log(err.message)
      toast.success("Something wrong happened")
    }
  }


  return (
    <>
      <Toaster />
      <Container style={{ marginTop: "20px" }}>
      <Card fluid>
      <Card.Content>
        <Segment>
          
          <Form.Group>
            <Form.Field>
              <input className="inp-box-for-amt" control={Input} type="number" value={productSummary.amt} disabled />
              <Button color="red" loading={addingMoney} onClick={() => addBalanceToProduct()}>Add Balance</Button>
            </Form.Field>
          </Form.Group>
        </Segment>
        <Segment>
        <b>
           Product Distribution balance:</b> {balance}
        </Segment>
        <Segment>
          <b>Title: </b>
          {productSummary.title}
        </Segment>
        <Segment>
          <b>Description along with installation and usage: </b> <br />
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(productSummary.description)}
          ></div>
        </Segment>
        <Segment>
          <b>Link to Product: </b>{productSummary.link} <br />
        </Segment>
        <Segment>
          <b>Managed by:</b> {productSummary.manager}
        </Segment>
        <Header as="h1">All Reviews</Header>
        {allReviews.length > 0 ?
        <Segment>
        {allReviews.map((element, index) => {
            return (
              <Review
                key={index}
                data={element}
                index={index}
                productAddress={productAddress}
                allReviewers={allReviewers}
                ipfsInstance = {ipfsInstance}
                // isAdmin={false}
              />
            );
          })}
        </Segment> : <h3>No reviews till now !!</h3> }
        </Card.Content></Card>
      </Container>
    </>
  );
};

export default ProductPage;
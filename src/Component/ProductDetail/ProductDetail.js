import React, { useEffect, useState, useContext } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
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
    // const [review, setReview] = useState({ title: "", description: "" });
    const [productInstance, setProductInstance] = useState();
    const [allReviews, setALlReviews] = useState([]);
    const [productSummary, setProductSummary] = useState({
      title: '',
      link: '',
      descp: '',
      amt: '',
      reviewLength: '',
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
        amt: productInfo[4],
        reviewLength: productInfo[7],
      });
       console.log("this are address opf reviews", addressOfReviewers)
       setReviewLen(addressOfReviewers.length)
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

  const addReviewToNetwork = async (reviewId) => {
    try {
      setLoading(true);
      await productInstance.methods.addReview(reviewId).send({
        from: currentAccount
      })
      setLoading(false)
      toast.success("Review added successfully")
    } catch(err) {
      console.log(err.message)
      toast.error("Something bad happend !!")
    }
  }

  const addReview = async () => {
    setReview({
      ...review, bug: convertedContent
    })
    const obj = {
      bestpart: review.bestpart,
      improvement: review.improvement,
      stuck: review.stuck,
      rating: review.rating,
      recommend: review.recommend,
      bug: convertedContent
    }
    const reviewId = await ipfsInstance.addJSON(obj);
    console.log("cid", reviewId)
    console.log("final review", reviewId)
    addReviewToNetwork(reviewId)
  }


  return (
    <>
      <Toaster />
      <Container style={{ marginTop: "20px" }}>
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
          <b>Managed by:</b> this we need to work on
        </Segment>
        <Header as="h1">All Reviews</Header>
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
        </Segment>
      </Container>
    </>
  );
};

export default ProductPage;
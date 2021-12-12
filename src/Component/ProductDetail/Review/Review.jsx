import React, { useContext, useEffect, useState } from "react";
import "./Review.scss";
import {
  Card,
  Icon,
  Modal,
  Input,
  Button,
  Form,
  Label,
  Header,
  Segment,
} from "semantic-ui-react";
// import { UserContext } from "../../../Provider/UserAddressProvider";
import toast, { Toaster } from "react-hot-toast";
import product from "../../../ethereum/product";
import web3 from "../../../ethereum/web3";
import IPFS from "ipfs-mini";
import DOMPurify from "dompurify";

const Review = (props) => {
  const [productInstance, setProductInstance] = useState();
  const [loadingRating, setLoading] = useState(false);
  const [rewardLoader, setRewardLoader] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [ipfsInstance, setIpfsInstance] = useState(null);
  const [addMoney, setAddMoney] = useState({ amt: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [rewardAmt, setRewardAmt] = useState(0);
  const [review, setReview] = useState({
    bestpart: "",
    improvement: "",
    stuck: "",
    rating: 0,
    recommend: "",
    bug: "",
  });
  const [rating, setRating] = useState(0);
  //   const info = useContext(UserContext);
  //   const { userAddress } = info;
  console.log(props);

  const setAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);
  };

  useEffect(() => {
    // if (userAddress) {
    console.log("this is", props.element);
    setAccount();
    const productInstance = product(props.productAddress);
    setProductInstance(productInstance);
    console.log("ideainstance is defined now ");
    setReviewData();
    // }
  }, []);

  //   const approveReview = async (reviewIndex) => {
  //     try {
  //       if (props.allReviewers.includes(currentAccount)) {
  //         toast("You already approved it !!");
  //       } else {
  //         setLoading(true);
  //         await productInstance.methods
  //           .approve(reviewIndex)
  //           .send({ from: currentAccount });
  //         toast.success("Review approved successfully");
  //         setLoading(false);
  //         setOpen(false);
  //         window.location.reload();
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //       toast.error("falied to approve review (you must hav already reviewed)!!");
  //     }
  //   };

  useEffect(() => {
    const ipfs = new IPFS({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });
    setIpfsInstance(ipfs);
  }, []);

  const setReviewData = () => {
    console.log(props.data);
    if (ipfsInstance) {
      ipfsInstance.catJSON(props.data.cid).then((data, err) => {
        setReview({
          bestpart: data.bestpart,
          improvement: data.improvement,
          stuck: data.stuck,
          rating: data.rating,
          recommend: data.recommend,
          bug: data.bug,
        });
        console.log(data);
      });
    }
  };

  const rateIt = async (reviewIndex) => {
    try {
      setLoading(true);
      console.log("rating the review");
      await productInstance.methods.rateReview(reviewIndex, rating).send({
        from: currentAccount,
      });
      setLoading(false);
      toast.success("Review Rated");
    } catch (err) {
      console.log(err.message);
      toast.success("Something bad happened !!");
    }
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    setReviewData();
  }, [ipfsInstance]);

  const rewardReview = async (reviewIndex, userAddress) => {
      try {
          setRewardLoader(true)
          console.log(rewardAmt + "and" + reviewIndex)
        await productInstance.methods.rewardReviewer(
            rewardAmt,
            reviewIndex,
        ).send({
            from: currentAccount,
        })
        toast.success("rewarded reviewer successfully !!")
        setRewardLoader(false)
      } catch(err) {
          console.log(err.message)
      }
  }

  return (
    <>
      <Toaster />
      <Modal
        closeIcon
        open={openRating}
        onClose={() => setOpenRating(false)}
        onOpen={() => setOpenRating(true)}
      >
        <Header as="h2" content="Rate it !!" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <input
                type="number"
                placeholder="rate this review"
                name="rating"
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <>
            <Button
              color="green"
              onClick={() => rateIt(props.index)}
              loading={loadingRating}
            >
              Yes !!
            </Button>
          </>
        </Modal.Actions>
      </Modal>
      <Card fluid>
        <Card.Content header={"Reviewer: " + props.data.from} />
        <Card.Content>
          <span>
            {" "}
            <Icon name="user" /> Approval:{props.data.approval}
          </span>
          <Form.Field>
            <input
              type="number"
              className="reward-review-inp"
              controle={Input}
              placeholder="Reward reviewer"
              onChange={(e) => setRewardAmt(e.target.value)}
            />
            <Button
              loading={rewardLoader}
              color="blue"
              onClick={() => rewardReview(props.index, props.data.from)}
            >
              Reward Reviewer
            </Button>
            {props.data.rating === "11" && (
              <Button
                onClick={() => setOpenRating(true)}
                color="green"
                floated="right"
                loading={loadingRating}
              >
                <Icon name="star" />
                Rate this review
              </Button>
            )}
          </Form.Field>
          {props.data.rating !== "11" ? (
            <Label as="a" color="teal" ribbon="right">
              Review Rating: {props.data.rating}
            </Label>
          ) : null}
          <Segment>
            <h3> Best part of our product which you like </h3>
            <p>{review.bestpart}</p>
            <h3> What can be improved further </h3>
            <p>
                {review.improvement}
            </p>
            <h3> Did it stuck any where while using it </h3>
            <p>{review.stuck}</p>
            <h3> How much you will rate on rating on 10 </h3>
            <p>{review.rating}</p>
            <h3> Would you recommend this to your friend </h3>
            <p>{review.recommend}</p>
            <h3>
              If you find any bug do mention it along with it's screenshots
            </h3>
            <div
              className="preview"
              dangerouslySetInnerHTML={createMarkup(review.bug)}
            ></div>
          </Segment>
          {props.data.paid === true ? <Label as='a' color='red' ribbon='right'>
            Review Paid
            </Label> : null }
          </Card.Content>
      </Card>
    </>
  );
};

export default Review;

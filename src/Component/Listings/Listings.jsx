import React, { useEffect, useState, useContext } from "react";
import { Container, Divider, Header, Grid } from "semantic-ui-react";
import ProductCard from "../Shared/productCard/ProductCard";
import { UserContext } from "../../providers/userProvider";
import company from "../../ethereum/company";
import { NavLink } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";
// import { UserContext } from "../../../Provider/UserAddressProvider";
import product from "../../ethereum/product";
// remebers to add unique string with product
// we should also add a minimum contribution for a reviewer to provide a valid review
// also add field like state country gender
const Exploration = () => {
  const [products, setProducts] = useState([]);
  const [fetchAllproducts, setFetchedproducts] = useState(false);
  // const info = useContext(UserContext);
  const [selectedproducts, setSelectedProducts] = useState([]);
  // const { age, city, country, gender, profession, terms, state } = info;
  const [allproducts, setAllproducts] = useState([]);
  const { info } = useContext(UserContext);
  const { user, isLoading } = info;
  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  useEffect(() => {
    const ourfunction = async () => {
      try {
        const address = await company.methods.allProductsAddress().call();
        console.log(address);
        setProducts(address);
      } catch (err) {
        console.log(" this is err ", err);
      }
    };
    ourfunction();
  }, []);

  useEffect(() => {
    const ourfunction = async () => {
      try {
        setFetchedproducts(true);
        await products.map(async (productAddress, index) => {
          const productInstance = product(productAddress);
          const productInfo = await productInstance.methods.getSummary().call();
          setAllproducts((allproducts) => [
            ...allproducts,
            { address: productAddress, productInfo },
          ]);

          // setAllproducts(selectedProducts);
          console.log(allproducts);
          console.log("ProductInfo is", productInfo);
          console.log("user is", user);
        });

        // setAllproducts(selectedProducts);
        setFetchedproducts(false);
        console.log("all products", allproducts);
      } catch (err) {
        console.log(err.message);
      }
    };
    ourfunction();
  }, [products]);

  useEffect(() => {
    const ourfunction = async () => {
      if (user) {
        const selectedProducts = await allproducts.filter((product) => {
          const ages = user.dob.split("-");
          const userAge = calculate_age(new Date(ages[0], ages[1], ages[2]));
          console.log("userage is", userAge);
          const minAge = parseInt(product.productInfo[5]);
          const maxAge = parseInt(product.productInfo[6]);
          console.log("max and min", maxAge, minAge);
          // if (userAge >= minAge && userAge <= maxAge) {
          //   return product;
          // }
          return userAge >= minAge && userAge <= maxAge;
        });

        setSelectedProducts(selectedProducts);
        console.log("selectedProducts", selectedProducts);
      }
    };
    ourfunction();
  }, [products, allproducts, info]);

  return (
    <>
      {fetchAllproducts && <Loader />}
      <Container>
        <Header style={{ marginTop: "20px" }} as="h3">
          /dashboard/products
        </Header>
        <Divider />
        <Grid stackable columns={3}>
          {selectedproducts.map((product, index) => {
            return (
              <Grid.Column key={index}>
                <Container fluid textAlign="center">
                  <NavLink
                    exact
                    activeClassName="current"
                    to={`/user/exploration/${product.address}`}
                  >
                    <ProductCard data={product} />
                  </NavLink>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Exploration;

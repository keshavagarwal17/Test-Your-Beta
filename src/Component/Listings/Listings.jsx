import React, { useEffect, useState } from "react";
import { Container, Divider, Header, Grid } from "semantic-ui-react";
import ProductCard from "../Shared/productCard/ProductCard";
import company from '../../ethereum/company';
import { NavLink } from "react-router-dom";
import Loader from '../Shared/Loader/Loader';
// import { UserContext } from "../../../Provider/UserAddressProvider";
import product from "../../ethereum/product";
// remebers to add unique string with product
// we should also add a minimum contribution for a reviewer to provide a valid review
// also add field like state country gender
const Exploration = () => {
  const [products, setProducts] = useState([]);
  const [fetchAllproducts, setFetchedproducts] = useState(false);
  // const info = useContext(UserContext);
  // const { age, city, country, gender, profession, terms, state } = info;
  const [allproducts, setAllproducts] = useState([]);

  useEffect(() => {
    try {
      setFetchedproducts(true);
      products.map(async (productAddress, index) => {
        const productInstance = product(productAddress);
        const productInfo = await productInstance.methods.getSummary().call();
        setAllproducts((allproducts) => [
          ...allproducts,
          { address: productAddress, productInfo },
        ]);
        console.log(allproducts);
        console.log(productInfo);
      });
      setFetchedproducts(false);
      console.log("all products", allproducts);
    } catch (err) {
      console.log(err.message);
    }
  }, [products]);

  useEffect(async () => {
    try {
      const address = await company.methods.allProductsAddress().call();
      console.log(address);
      setProducts(address);
      // const product = product(productAddress);
      // console.log(product);
      // setproductInstance(product);
      // const productInfo = await product.methods.getSummary().call();
      // console.log(userAddress + " " + age);
    } catch (err) {
      console.log(" this is err ", err);
    }
  }, []);

  const filterproduct = (product) => {
    // const productTitle = product[0];
    // const productDescription = product[1];
    // const productAmt = product[4];
    // const productAgeMax = product[5];
    // const productAgeMin = product[6];

    return true;
  };

  return (
    <>
      {fetchAllproducts && <Loader />}
      <Container>
        <Header style={{ marginTop: "20px" }} as="h3">
          /dashboard/products
        </Header>
        <Divider />
        <Grid stackable columns={3}>
          {allproducts.filter(filterproduct).map((product, index) => {
            return (
              <Grid.Column key={index}>
                <Container fluid textAlign="center">
                  <NavLink
                    exact
                    activeClassName="current"
                    to={`/exploration/${product.address}`}
                  >
                    <ProductCard 
                    data={product}
                     />
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
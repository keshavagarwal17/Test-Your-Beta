import React from 'react'
import { Button, Form, Segment,Container } from "semantic-ui-react";
import { useState, useContext,useEffect } from "react";
import {UserContext,fetchInfo} from '../../../providers/userProvider'
import {updateUserInfo} from '../../../services/auth'
import {useHistory } from 'react-router-dom';

const CompanyForm = () => {
  const {info} = useContext(UserContext);
  const {user,isLoading} = info;
  const [data, setData] = useState({});
  const [isEdit,setEdit] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    if(!isLoading){
      if(user.companyName){
        setEdit(true);
      }
      setData(
        {companyName:user.companyName,productType: user.productType}
      )
    }
  },[info])

    const labelStyle = { fontSize: "15px" };
    const formElement = [
        {
            label: "Company Name",
            placeholder: "Write Company Name",
            name: "companyName",
            type: "text",
            isTextArea: false,
        },
        {
            label: "About your company",
            placeholder: "Mention the types of products you build",
            name: "productType",
            type: "text",
            isTextArea: true,
        },
    ]
    const handleSubmit = async()=>{
      await updateUserInfo(data,user.uid);
      fetchInfo();
      if(isEdit){
        history.push("/dashboard");
      }
    }
    const setInfo = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      };
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
          <Form.Field>
            <label style={labelStyle} className="label">
              {ele.label}
            </label>
            {ele.isTextArea ? (
              <textarea
                name={ele.name}
                style={{ minHeight: 150 }}
                placeholder={ele.placeholder}
                type={ele.type}
                onChange={(e) => setInfo(e)}
                value={data[ele.name]}
                required
              />
            ) : (
              <input
                type={ele.type}
                name={ele.name}
                placeholder={ele.placeholder}
                onChange={(e) => setInfo(e)}
                value={data[ele.name]}
                required
              />
            )}
          </Form.Field>
        ));
      };
    return (
        <div>
          <Container>
            <Segment style={{ paddingLeft: '2vw', marginTop: '5vh' }}>
                <h2 style={{ marginBottom: '5vh' }}>Company Details</h2>
                <Form>
                    {renderFormElements()}
                    <Button
                    color="green"
                    style={{ marginTop: "2%" }}
                    type="submit"
                    onClick={handleSubmit}
                    >
                    {user.companyName?"Update":"Submit"}
                    </Button>
                </Form>
            </Segment>
          </Container>
        </div>
    )
}

export default CompanyForm

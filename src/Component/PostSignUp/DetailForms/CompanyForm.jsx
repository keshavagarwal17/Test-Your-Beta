import React from 'react'
import { Button, Form, Segment } from "semantic-ui-react";
import { useState, useContext } from "react";
import {UserContext} from '../../../providers/userProvider'
import {updateUserInfo} from '../../../services/auth'


const CompanyForm = () => {
    const [data, setData] = useState({});
    const {info,fetchInfo} = useContext(UserContext);
    const {user,isLoading} = info;
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
            label: "Types of Products",
            placeholder: "Mention the types of products you build",
            name: "productType",
            type: "text",
            isTextArea: true,
        },
    ]
    const handleSubmit = async()=>{
      await updateUserInfo(data,user.uid);
      fetchInfo();
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
                required
              />
            ) : (
              <input
                type={ele.type}
                name={ele.name}
                placeholder={ele.placeholder}
                onChange={(e) => setInfo(e)}
                required
              />
            )}
          </Form.Field>
        ));
      };
    return (
        <div>
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
                    Submit
                    </Button>
                </Form>
            </Segment>
        </div>
    )
}

export default CompanyForm

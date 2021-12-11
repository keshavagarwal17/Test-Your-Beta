import React from 'react'
import { Button, Form, Segment , Container } from "semantic-ui-react";
import { useState } from "react";


const CompanyForm = () => {
    const [data, setData] = useState({});
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
          <Container>
            <Segment style={{ paddingLeft: '2vw', marginTop: '5vh' }}>
                <h2 style={{ marginBottom: '5vh' }}>Company Details</h2>
                <Form>
                    {renderFormElements()}
                    <Button
                    color="green"
                    style={{ marginTop: "2%" }}
                    type="submit"
                    onClick={() => {}}
                    >
                    Submit
                    </Button>
                </Form>
            </Segment>
          </Container>
        </div>
    )
}

export default CompanyForm

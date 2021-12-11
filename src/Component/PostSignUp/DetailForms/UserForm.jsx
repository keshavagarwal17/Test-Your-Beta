import React from 'react'
import { Button, Form, Segment } from "semantic-ui-react";
import { useState } from "react";


const UserForm = () => {
    const [data, setData] = useState({});
    const gender = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
      ]
    const labelStyle = { fontSize: "15px" };
    const formElement = [
        {
            label: "Interested Categories of applications",
            placeholder: "Write categories of applications e.g. Banking, Food-Ordering, Trivia, Gaming etc.",
            name: "companyName",
            type: "text",
            isTextArea: false,
        },
        {
            label: "Age",
            placeholder:
              "Enter your age",
            name: "age",
            type: "number",
            isTextArea: false,
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
            <Segment style={{ paddingLeft: '2vw', marginTop: '5vh' }}>
                <h2 style={{ marginBottom: '5vh' }}>User Details</h2>
                <Form>
                    {renderFormElements()}
                    <Form.Select
                        fluid
                        label='Gender'
                        options={gender}
                        placeholder='Gender'
                    />
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
        </div>
    )
}

export default UserForm

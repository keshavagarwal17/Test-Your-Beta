import React from 'react'
import { Button, Form, Segment,Container, Select } from "semantic-ui-react";
import { useState,useContext } from "react";
import {UserContext,fetchInfo} from '../../../providers/userProvider'
import {updateUserInfo} from '../../../services/auth'

const UserForm = () => {
    const [data, setData] = useState({});
    const {info} = useContext(UserContext);
    const {user,isLoading} = info;
    const genderOptions = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
      ]
    const labelStyle = { fontSize: "15px" };
    const formElement = [
        {
            label: "Name",
            placeholder: "Enter your name",
            name: "name",
            type: "text",
            isTextArea: false
        },
        {
            label: "dob",
            placeholder: "Enter your Dob",
            name: "dob",
            type: "date",
            isTextArea: false,
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
              <Container>
            <Segment style={{ paddingLeft: '2vw', marginTop: '5vh' }}>
                <h2 style={{ marginBottom: '5vh' }}>User Details</h2>
                <Form>
                    {renderFormElements()}
                    <Form.Field
                      control={Select}
                      label='Gender'
                      options={genderOptions}
                      placeholder='Select your Gender'
                      onChange={(e, { value }) => {
                        setData({
                          ...data,
                          gender: value
                        })
                      }}
                    />
                    <Button
                    color="green"
                    style={{ marginTop: "2%" }}
                    type="submit"
                    onClick={() => handleSubmit()}
                    >
                    Submit
                    </Button>
                </Form>
            </Segment>
            </Container>
        </div>
    )
}

export default UserForm

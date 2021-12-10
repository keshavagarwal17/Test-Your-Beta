import React from 'react'
import {
    Container,
    Segment,
    Form,
    Button,
    Dropdown,
    Input,
    Message,
  } from "semantic-ui-react";

const SelectRole = () => {
    const [role, setRole] = React.useState('');
    const handleRoleChange = (e, { value }) => setRole(value);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3vh', }}>
            <Segment style={{ padding: '20vh 40vw' }}>
                <h1>Select your Role</h1>
                <Form.Group inline>
                    <Form.Radio
                        label='User'
                        value='user'
                        checked={role === 'user'}
                        onChange={handleRoleChange}
                        style={{ margin: '2vh auto', fontSize: '1vw'}}
                    />
                    <Form.Radio
                        label='Company'
                        value='company'
                        checked={role === 'company'}
                        onChange={handleRoleChange}
                        style={{ margin: '2vh auto', fontSize: '1vw'}}
                    />
                </Form.Group>
                <Button
                    color="green"
                    style={{ marginTop: "4vh" }}
                    type="submit"
                    onClick={() => {}}
                >
                    Next
                </Button>
            </Segment>
        </div>
    )
}

export default SelectRole

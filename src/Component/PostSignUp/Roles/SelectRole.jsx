import React,{useContext} from 'react'
import {UserContext} from '../../../providers/userProvider'
import { updateUserInfo } from "../../../services/auth";
import {
    Segment,
    Form,
    Button
  } from "semantic-ui-react";

const SelectRole = () => {
    const [role, setRole] = React.useState('');
    const {info,fetchInfo} = useContext(UserContext);
    const {user,isLoading} = info;

    const handleRoleChange = (e, { value }) => setRole(value);

    const handleSubmit = async()=>{
        await updateUserInfo({role},user.uid);
        fetchInfo();
    }

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
                    onClick={handleSubmit}
                >
                    Next
                </Button>
            </Segment>
        </div>
    )
}

export default SelectRole

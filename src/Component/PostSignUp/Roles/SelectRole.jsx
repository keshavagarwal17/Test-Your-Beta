import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext,fetchInfo } from "../../../providers/userProvider";
import { updateUserInfo } from "../../../services/auth";
import { Segment, Card, Button, Form } from "semantic-ui-react";

const SelectRole = () => {
  const [role, setRole] = React.useState("");
  const { info } = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setRedirect] = React.useState(null);

  const handleSubmit = async () => {
    await updateUserInfo({ role }, user.uid);
    fetchInfo();
    if (role === "user") {
      setRedirect("/user-form");
    } else {
      setRedirect("/company-form");
    }
  };

  const handleRoleChange = (e, { value }) => setRole(value);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3vh",
      }}
    >
      <Segment style={{ padding: "20vh 40vw" }}>
        <h1>Select your Role</h1>
        <Card.Group>
          <Card fluid color="green" header="User">
            <Card.Content>
              <Card.Header>
                <Form.Radio
                  label="User"
                  value="user"
                  checked={role === "user"}
                  onChange={handleRoleChange}
                  style={{ margin: "2vh auto", fontSize: "1vw" }}
                  onClick={() => {
                    setRole("user");
                  }}
                />
              </Card.Header>
            </Card.Content>
          </Card>
          <Card fluid color="green" header="Company">
            <Card.Content>
              <Card.Header>
                <Form.Radio
                  label="Company"
                  value="company"
                  checked={role === "company"}
                  onChange={handleRoleChange}
                  style={{ margin: "2vh auto", fontSize: "1vw" }}
                  onClick={() => {
                    setRole("company");
                  }}
                />
              </Card.Header>
            </Card.Content>
          </Card>
        </Card.Group>

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
  );
};

export default SelectRole;

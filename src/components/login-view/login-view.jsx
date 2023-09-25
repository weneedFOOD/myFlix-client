import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      // this prevents the default behavior of the form which is to reload the entire page
      event.preventDefault();
      
      const data = {
        Username: username,
        Password: password
      };

      fetch("https://hora-flix-f4f11200119c.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
            console.log("Response received:",response);
            return response.json();
        })
        .then((data) => {
            console.log("Login response:", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                console.log("No user found in response:",data);
                alert("No such user");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Something went wrong");
      });
    };  

    console.log("Fetching login data...");


    return (
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
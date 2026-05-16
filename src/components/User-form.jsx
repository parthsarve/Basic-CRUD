import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

function Userform() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    gender: "",


  });

  const { id } = useParams();
  console.log(id);

  let navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value

    })
  }
  async function submit(e) {
    e.preventDefault();

try {
  let response;
  if (id) {
    response = await axios.put(`https://69fee7418c70b15fa3cad80c.mockapi.io/users/${id}`,
      formData);
    alert("user is update")
    navigate("/");
  } else {
    response = await axios.post("https://69fee7418c70b15fa3cad80c.mockapi.io/users",
      formData)
    navigate("/");
  }
} catch (error) {
  console.log("server error:", error.message);
  
}
  }



  async function getDataById() {
    let response = await axios.get(`https://69fee7418c70b15fa3cad80c.mockapi.io/users/${id}`)
    setFormData(response.data)
  }

  
  useEffect(() => {
    if (id) getDataById()
  }, [id]

  );

  return (
    <>
      <div className="d-flex py-3 hero">
        <h2 className="title">User Form</h2>

      </div>

      <div className="user-form">

        <Form onSubmit={submit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Last name" name="lastName"
                value={formData.lastName}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}

                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" name="city"
                value={formData.city}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" name="state"
                value={formData.state}
                onChange={handleChange} />
            </Form.Group>


            <Form.Group className="my-4" md="4">
              <Form.Select name="gender"
                value={formData.gender}
                onChange={handleChange}>
                <option>Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>

              </Form.Select>
            </Form.Group>


          </Row>

          <Button type="submit"><FaRegSave />  {id ? "update user" : "create user"} </Button>
          <Button className="mx-3" variant="danger" onClick={() => navigate("/")}>
            <IoMdArrowRoundBack /> Back
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Userform;
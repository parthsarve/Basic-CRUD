import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import "../style/userTable.css";
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io'; 

function Userlist() {
  const [users, setusers] = useState([])
  let navigate = useNavigate();
  async function getData() {
    let res = await axios.get("https://69fee7418c70b15fa3cad80c.mockapi.io/users")
    console.log(res.data);
    let data = res.data
    setusers(data)
  }

async function deleteUser(id) {
  await axios.delete(`https://69fee7418c70b15fa3cad80c.mockapi.io/users/${id}`)
  alert("user delete successfully..!" )
  getData()
}



  useEffect(()=>{
    getData()
  }, [] )
  return (
    <>

      <div className="d-flex p-3 hero justify-content-between">
        <div><h3 className="title"  >User Table</h3></div>
        <Button className='' variant="success" onClick={() => navigate("/user-form")}>
          <AiOutlineUsergroupAdd /> Add User 
        </Button>
      </div>
      <div className="user-table">
        <Table bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.gender}</td>
                <td>
                  <span className="edit" 
                    onClick={() => navigate(`/user-form/${user.id}`)}>
                    <MdOutlineModeEdit />
                  </span>
                  <span className="delete"
                  onClick={() => deleteUser (user.id)}>
                    <MdDeleteOutline />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div >
        </>
        )
}

export default Userlist
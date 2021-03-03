import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const users = [
  {id: 1, name: "Emilio Escano"},
  {id: 2, name: "Lia"}
]

function App() {
  const [usersData, setUsersData] = useState([]);
  const [udpdateModal, setUpdateModal] = useState(false);
  const [userSelected, setUserSelected] = useState({
    id: "", 
    name: ""
  })

  const selectUser = (user, action) => {
    setUserSelected(user);
    if(action === "update"){
      setUpdateModal(true)
    }
  }
  const handleChange = e => {
    const {name, value} = e.target;
    setUserSelected((prevstate)=> ({
      ...prevstate,
      [name]:value
    }))
  }

  return (
    <div className="App">
    
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td><button className="btn btn-primary" 
                        onClick = {()=>selectUser(user, "update")}>
                        Update
                </button> {" "}
                <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Modal isOpen={udpdateModal}>
        <ModalHeader>
            <div>
                <h2>Update name</h2>
            </div>
        </ModalHeader>
        <ModalBody>
            <div className = "form-group">
                <label>ID</label>
                <input className ="form-control" 
                    readOnly 
                    type="text" 
                    name = "id"
                    value = {userSelected.id}
                    />
                <br/>
                <label>Name</label>
                <input className ="form-control" 
                    type="text" 
                    name = "name"
                    value = {userSelected.name}
                    onChange={handleChange}
                    />
                  
                <br/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary"
                    onClick={()=> setUpdateModal(false)}
            >Update</button>
            <button className="btn btn-danger"
            onClick={()=> setUpdateModal(false)}
            >Cancel</button>
        </ModalFooter>
    </Modal>
    </div>
  );
}

export default App;

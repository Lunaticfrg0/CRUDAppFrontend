import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter, Form } from "reactstrap";
import { GetAllUsers, 
        GetSingleUser, 
        DeleteUser, 
        UpdateUser, 
        CreateUser} from "./util/APIFunctions"


function App() {
  const [usersData, setUsersData] = useState([]);
  const [udpdateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [userSelected, setUserSelected] = useState({
    id: "", 
    name: ""
  })

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      GetAllUsers().then((users) => {
        setUsersData(users);
      });
    }
    return () => (mounted = false);
  }, []);

  const selectUser = (user, action) => {
    setUserSelected(user);
    if(action === "update"){
      setUpdateModal(true)
    }
    else{
      setDeleteModal(true)
    }
  }
  const handleChange = e => {
    const {name, value} = e.target;
    setUserSelected((prevstate)=> ({
      ...prevstate,
      [name]:value
    }))
  }

  const updateUser = () => {
    let newUser = usersData;
    newUser.map(user => {
      if(user.id === userSelected.id){
        user.name = userSelected.name;
      }
    })
    setUsersData(newUser)
    setUpdateModal(false)
  }

  const deleteUser = () => {
    setUsersData(usersData.filter(user => user.id !== userSelected.id))
    setDeleteModal(false)
    console.log(usersData)
  }
  
  const openCreateModal = () => {
    setUserSelected(null)
    setCreateModal(true)
  }

  const createUser = () => {
    CreateUser(userSelected.name).then((user) => {
      setUsersData.push(user);
    });
    setCreateModal(false) 
  }

  return (
    <div className="App">
    <h1>Users in the system</h1>
    <br/>
    <button className="btn btn-success" 
            onClick = {()=> openCreateModal()}>
            Create User</button>
    <hr/>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map(user => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td><button className="btn btn-primary" 
                        onClick = {()=>selectUser(user, "update")}>
                        Update
                </button> {" "}
                <button className="btn btn-danger"
                        onClick={()=> selectUser(user, "delete")}
                >Delete</button>
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
                    value = {userSelected && userSelected.id}
                    />
                <br/>
                <label>Name</label>
                <input className ="form-control" 
                    type="text" 
                    name = "name"
                    value = {userSelected && userSelected.name}
                    onChange={handleChange}
                    />
                  
                <br/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary"
                    onClick={()=> updateUser()}>
                    Update</button>
            <button className="btn btn-danger"
            onClick={()=> setUpdateModal(false)}>
            Cancel</button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={deleteModal}>
      <ModalBody>
          Are you sure you want to delete the user: { userSelected && userSelected.name}?
      </ModalBody>
      <ModalFooter>
        <button className= "btn btn-danger"
                onClick = {()=> deleteUser()}>
          Delete
        </button>
        <button className= "btn btn-secundary"
                onClick= {()=>setDeleteModal(false)}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
    <Modal isOpen = {createModal}>
      <ModalBody>
      <div className = "form-group">
                <label>Name</label>
                <input className ="form-control" 
                    type="text" 
                    name = "name"
                    value = {userSelected? userSelected.name: ""}
                    onChange = {handleChange}
                    />
                <br/>
            </div>
      </ModalBody>
      <ModalFooter>
      <button className= "btn btn-primary"
                onClick={()=> createUser()}>
          Create
        </button>
        <button className= "btn btn-danger"
                nClick={()=> setCreateModal(false)}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
    </div>
  );
}

export default App;

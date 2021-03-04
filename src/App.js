import React, {useState, useEffect} from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, 
          ModalFooter } from "reactstrap";
import { GetAllUsers, 
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

  const updateUserList = () => {
    GetAllUsers().then((users) => {
      setUsersData(users);
    });
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
     updateUserList()
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
    UpdateUser(userSelected.id, userSelected.name).then((users) => {
      setUpdateModal(false)
    }).then(updateUserList);
  }

  const deleteUser = () => {
    DeleteUser(userSelected.id).then((users) => {
      setDeleteModal(false)
    }).then(updateUserList);
  }
  
  const openCreateModal = () => {
    setUserSelected(null)
    setCreateModal(true)
  }

  const createUser = () => {
    CreateUser(userSelected.name).then((user) => {
    }).then(updateUserList);
    setCreateModal(false) 
  }

  const contentHandler = () => {
    if(!usersData[0]){
      return <h1>No Users</h1>
    }
    else {
      return usersData.map(user => (
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
      ))
    }
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
      {contentHandler()}
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
                onClick={()=> setCreateModal(false)}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
    </div>
  );
}

export default App;

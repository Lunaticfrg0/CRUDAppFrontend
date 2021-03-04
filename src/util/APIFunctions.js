import axios from "axios";

export async function GetAllUsers() {

    let data = {}
    
    try {
        const response = await axios.get(
                'http://localhost:4019/api/users'
            );
            data = response.data
    } catch(error){
    }
    return data
}
export async function GetSingleUser(ID) {

    let data = {}
    
    try {
        const response = await axios.get(
                `http://localhost:4019/api/users/${ID}`
            );
            data = response.data
    } catch(error){
        console.log("error")
    }
    return data
}
export async function DeleteUser(ID) {

    let data = {}
    
    try {
        const response = await axios.delete(
                `http://localhost:4019/api/users/${ID}`
            );
            data = response.data
    } catch(error){
        console.log("error")
    }
    return data
}
export async function UpdateUser(ID, name) {

    let data = {}
    
    try {
        const response = await axios.patch(
                `http://localhost:4019/api/users/${ID}`, {
                    name : name
                }
            );
            data = response.data
    } catch(error){
        console.log("error")
    }
    return data
}
export async function CreateUser(name) {

    let data = {}
    
    try {
        const response = await axios.post(
                `http://localhost:4019/api/users`, {
                    name : name
                }
            );
            data = response.data
    } catch(error){
        console.log("error")
    }
    return data
}
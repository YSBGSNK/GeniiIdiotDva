import React, { useState } from 'react';
import axios from 'axios';

function UserLogin(){
    const [userid, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const [label, setLabel] = useState('kal')
    function handleForm(event){
        event.preventDefault()
        let userData = {
            userId:userid, 
            password:password
        }
        var jsonData = {"datasent":userData.userId, "answers":userData.password}
        fetch("http://localhost:5000/api/login", {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
        })
        console.log(jsonData)
        axios.get('http://localhost:5000/api/login').then(response => { return response.data}).then(data => {setLabel(data)})
        setUserID('')
        setPassword('')
    }

    return(
        <div>
            <form onSubmit={handleForm}>
            <input type="text" name="userID" onChange={e=>setUserID(e.target.value)}/><br/>
            </form>
        </div>
    )
}

export default UserLogin


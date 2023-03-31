import React, { useEffect, useState } from 'react';
import Api from '../helpers/Api';


function UsersView(props) {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        let myresponse = await Api.getUsers();
        if (myresponse.ok) {
            setUsers(myresponse.data);
            setErrorMsg('');
        } else {
            setUsers([]);
            setErrorMsg(`Error ${myresponse.status}: ${myresponse.statusText}`);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!users) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="UsersView">
            <h1>Users</h1>
            <ul>
            {
                users.map(u => <li key={u.id}>{u.username}</li>)
            }
            </ul>
        </div>
    );
}


export default UsersView;
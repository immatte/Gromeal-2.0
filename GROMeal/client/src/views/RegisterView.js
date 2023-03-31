import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const EMPTY_USER = {
    username: '',
    password: '',
    email: ''
  };

function RegisterView(props) {
    const [newUser, setNewUser] = useState(EMPTY_USER); 
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    //POST a new user
    async function addUser (user) {
        console.log(user);
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        };
        try {
          let response = await fetch(`/api/register`, options);
          if (response.ok) {
            let user = await response.json();
            setUser(user);
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Server error: ${err.message}`);
        }
      }
    

     
  
  function handleSubmit(event) {
    event.preventDefault();
    addUser(newUser);
    setNewUser(EMPTY_USER);
    let message = `Successfully registered! now you can login`
            toast(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
    navigate("/login");

  }

  function handleChange(event) {
    let { name, value } = event.target;
        setNewUser(data => ({
            ...data, 
            [name]: value
        }));
    }

    return (
        <div className='banner1' style={{backgroundColor: '#FFCC00'}}>
               

                <ToastContainer
                    position="//#region"
                    autoClose={10}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />   

<div className='container-fluid col-9'></div>
        <div className='inline-block align-items-center pt-5' style={{height: "100vh"}}>
        <div id="Logincard" className="card d-flex p-5 mx-auto col-5">
            <div className="row d-flex justify-content-center col-12 text-left">
                <h2 id="title2">Register</h2>
                <p>Register to save all your weekly plans and shopping lists.</p>
                
                <form onSubmit={handleSubmit} className="form-group col-12 flex-column d-flex">
                    
                        <label className="form-control-label px-1 pb-2">Username
                            <input
                                type="text"
                                name="username"
                                required
                                className="form-control form-control-lg"
                                value={newUser.username}
                                onChange={handleChange}
                            />
                        </label>
                
                        <label className="form-control-label px-1 pb-2">Password
                            <input
                                type="password"
                                name="password"
                                required
                                className="form-control form-control-lg"
                                value={newUser.password}
                                onChange={handleChange}
                            />
                        </label>
                
                        <label className="form-control-label px-1">Email
                            <input
                                type="email"
                                name="email"
                                required
                                className="form-control form-control-lg"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                        </label>

                    <button id="buttonA" type="submit" className="btn btn-warning px-5 btn-lg mt-3">SUBMIT</button>
                </form>
            </div>
        </div>
        </div>
        </div>
    );

}

export default RegisterView;
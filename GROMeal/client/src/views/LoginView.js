import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Local from '../helpers/Local';
import Api from '../helpers/Api';
import RecipesContext from '../components/RecipesContext';



function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {warning, setWarning, user, setUserPlans} = useContext(RecipesContext);

    useEffect(() => {
        handleWarning();
      }, {});

    const {warning, setWarning, user, setUser} = useContext(RecipesContext);

    useEffect(() => {
        handleWarning();      
      }, {});

    const handleWarning = event => {
        toast(warning, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            }      


    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleWarning = event => {
        console.log(warning);
        toast(warning, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            }    

    async function handleSubmit(event) {
        event.preventDefault();
        await props.loginCb(username, password)
        addUserId();
    }
    
    async function addUserId() {
        const planId = Local.getPlan();
        const userId = Local.getUserId();
        console.log(planId, userId);

        if (planId && userId) {
            console.log(user);
            //PUT to modify
                try {
                    let response = await Api._doFetch(`/api/allplans/${planId}`, 'PUT', {user_id: userId});
                    console.log(response);
                    if (response.ok) {
                        let plans = response.data;
                        setUserPlans(plans);
                    } else {
                        console.log(`Server error: ${response.status} ${response.statusText}`);
                    }
                } catch (err) {
                    console.log("hello");
                    console.log(`Server error: ${err.message}`);
                }
            
        
        }

    }

    return (

        <div className='banner1' style={{backgroundColor: '#FFCC00'}}>
            <div onLoadStart={handleWarning}>

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
                                     
        </div>
      <div className='container-fluid col-9'></div>
        <div className='inline-block align-items-center pt-5 pb-5'>
        <div id="Logincard" className="card d-flex p-5 mx-auto col-5">
            <div className="row d-flex justify-content-center col-12 text-left">
                <h2 id="title2">Login</h2>
                <p>Get all your Plans and Shopping Lists</p>

                
                {
                    props.loginError && (
                        <div className="alert alert-danger">{props.loginError}</div>
                    )
                }

                <form className="form-group col-12 flex-column d-flex" onSubmit={handleSubmit}>
                    
                        <label className="form-control-label px-1 pb-2">Username
                            <input
                                type="text"
                                name="usernameInput"
                                required
                                className="form-control form-control-lg"
                                value={username}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-control-label px-1">Password
                            <input
                                type="password"
                                name="passwordInput"
                                required
                                className="form-control form-control-lg"
                                value={password}
                                onChange={handleChange}
                            />
                        </label>

                    <button type="submit" id="buttonA" className="btn btn-warning px-5 btn-lg mt-3">SUBMIT</button>
                </form>

                <div className='align-items-center'>
                   Not yet a member? <Link to="/register" type="submit">REGISTER</Link>
                </div>
            </div>
        </div>
        </div>
        
      </div>
     
    );

}

export default LoginView;
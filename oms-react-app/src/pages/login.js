import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import '../css/login.css'
import Oms from './oms';

//import axios from 'axios'
//import './App.css';
//var userName;
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //userName = username;
  //console.log('username inside',userName);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlepassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const apiUrl = `http://127.0.0.1:8000/api/get_login/${username}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`error:${response.status}`);
      }
      const data = await response.json();
      if (data.username == username && data.password == password) {
        alert('welcome!');
        // Redirect to the '/oms' route
        navigate(`/show/${username}`);
        //window.open('/oms');
      } else {
        alert('try again');
      }
      console.log('data', data);
    } catch (error) {
      alert('please try again');
      console.error('error', error);
    }
  };



  return (
    <>
    <nav>
      <span>Home</span>
    </nav>
      <div className="loginapp">
          <div className='row card shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
            <div className='col card-title'>
            <h2>Login Page</h2>
            </div>
            <div className='col card-body'>
              <form name='loginform' onSubmit={handleSubmit}>
                <label>Username:
                  <input type='text' className='form-control' name='username' value={username} onChange={handleUsername} />
                </label>
                <br />
                <label>Password:
                  <input type='password' className='form-control' name='password' value={password} onChange={handlepassword} />
                </label>
                <br />
                <input type='submit' className='form-control' id='submit' value='Submit' />
              </form>
            </div>
            <div className='col'>
              <p>New User?<Link to='/register'>Register here</Link></p>
              <p>Forgot password?<Link to='/reset'>Reset here</Link></p>

            </div>
          </div>
        
      </div>
    </>

  );

}

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import '../css/login.css'


/*
It is index page. This component purpose is for login functionality. It validates the username and password with the fetched data.
After successful login it redirectes to main OMS show component.
*/

function Login() {

  //Here we are taking username and password as states assigning them with empty string. navigate variable is to navigate between components.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //To handle the change in username field.
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  //To handle the change in password field.
  const handlepassword = (event) => {
    setPassword(event.target.value);
  };

  //handles the submit functionality. Prevents the usual functionality and perform validation and navigation.
  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(username, password);

    try {

      //apiUrl holds the api end point which can be used to fetch login details from the server.
      const apiUrl = `http://127.0.0.1:8000/api/get_login/${username}`;

      //We are connecting to server with GET, here fetch returns the response which contains status code and data.
      const response = await fetch(apiUrl);

      //if the response is not 200 throws the error.
      if (!response.ok) {
        throw new Error(`error:${response.status}`);
      }

      //We are fetching the data from the server and converts to json.
      const data = await response.json();

      //if username, password from the server matches the entered usernam, password then navigate to show component.
      if (data.username == username && data.password == password) {
        alert('welcome!');
        navigate(`/show/${username}`); // Redirect to the '/show' route
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
      <div className="container">
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
              <p>New User?
                <Link to='/register'>Register here</Link>
              </p>
              <p>Forgot password?
                <Link to='/reset'>Reset here</Link>
              </p>
            </div>
          </div>
      </div>
    </>

  );

}

export default Login; //helps in importing this component in another component

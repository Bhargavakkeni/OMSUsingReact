import react, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

/* 
This component is for register functionality. Sends the enter user credentials to the server through post method.
*/

export default function Register() {

  //We are using username to store entered username and passwords to handle password confirmantion.
  const [username, setUsername] = useState('');
  const [passwords, setPassword] = useState({});
  const navigate = useNavigate();

  //handles the username
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  //handles the entered passwords
  const handpassword = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPassword(values => ({ ...values, [name]: value }))
  };

  //Handles the submit for the registration form. Prevents the usual behaviour and sends the entered data to server.
  const handleSubmit = async (event) => {

    event.preventDefault();

    //for password validation.
    if (passwords.password != passwords.confirmpassword) {
      alert('Password does not match');
      return false;
    }

    //to send the data to server.
    try {

      const apiUrl = `http://127.0.0.1:8000/api/get_login`;
      const postLoginDetails = { 'username': username, 'password': passwords.password };

      //Establishes the connection using apiUrl as endpoint. method is post, headers contain what type of data we are sending.
      //body contains the data to send. JSON.stringfy is used to convert javascript object to json.
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postLoginDetails),
      });

      //if response is 201 navigate to login component.
      if (response.status != 201) {
        alert('User already exist');
      } else if (response.status == 201) {
        alert('registered successfuly');
        const data = await response.json();
        console.log('saved:', data);
        navigate('/login');
      }

    } catch (error) {
      console.error('error', error.message);
    }

  };


  return (

    <>
      <nav>
        <span>Home</span>
      </nav>
      <div className='container'>
        <div className='row card shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
          <div className='col card-title'>
            <h2>
              Registration Page
            </h2>
          </div>
          <div className='col card-body'>
            <form name='registerform' onSubmit={handleSubmit}>
              <label> Username
                <input type='text' className='form-control' name='username' value={username} onChange={handleUsername} />
              </label>
              <br />
              <label> Password:
                <input type='password' className='form-control' name='password' value={passwords.password || ''} onChange={handpassword} />
              </label>
              <br />
              <label> Confirm Password:
                <input type='password' className='form-control' name='confirmpassword' value={passwords.confirmpassword || ''} onChange={handpassword} />
              </label>
              <br />
              <input type='submit' className='form-control' id='submit' value='Submit' />
            </form>
          </div>
          <div className='col'>
            <p>Already a user? 
              <Link to='/login'> Login here </Link>
            </p>
          </div>
        </div>
      </div>
    </>

  )
}
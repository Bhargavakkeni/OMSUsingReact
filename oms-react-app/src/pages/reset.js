import react, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../css/login.css';

/*
This component is reset functionality. Lets the user reset their password.
*/

export default function Reset() {

  //Same as in register component
  const [username, setUsername] = useState('');
  const [passwords, setPassword] = useState({});
  const navigate = useNavigate();

  //handles username change
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  //handles passwords change
  const handpassword = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPassword(values => ({ ...values, [name]: value }))
  };

  //handles the reset form functionaliy. Sends data through put method.
  const handleSubmit = async (event) => {

    event.preventDefault();

    //password validation
    if (passwords.password != passwords.confirmpassword) {
      alert('Password does not match');
      return false;
    }

    //establish connection to update user login credentials
    try{

      const apiUrl = `http://127.0.0.1:8000/api/get_login/${username}`;
      const updateLoginDetails = { 'username': username, 'password': `${passwords.password}` };
      console.log(passwords.password, username);

      //send the data through put method. 
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateLoginDetails),
      });

      //if response is 202 navigate to login component.
      if (response.status == 202) {
        alert('reseted successfuly');
        const data = await response.json();
        console.log('saved:', data);
        navigate('/login');
      } else if (response.status == 404) {
        alert('User does not exist');
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
              Reset Page
            </h2>
          </div>
          <div className='col card-body'>
            <form name='resetform' onSubmit={handleSubmit}>
              <label> Username:
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
            <p>New user?<Link to='/register'>Register here</Link></p>
          </div>
        </div>
      </div>
    </>

  )

}
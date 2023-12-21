import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';

export default function Reset() {
  const [username, setUsername] = useState('');
  const [passwords, setPassword] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(username, password);
    try {
      const apiUrl = `http://127.0.0.1:8000/api/get_login/${username}`;
      const updateLoginDetails = {'username':username,'password':`${passwords.password}`};
      console.log(passwords.password,username);
      const response = await fetch(apiUrl,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateLoginDetails),
      });
      if (!response.ok) {
        throw new Error(`error:${response.status}`);
      }else{
        alert('reseted successfuly');
      }
      const data = await response.json();
      
      console.log('saved:',data);
    } catch (error) {
      alert('please try again');
      console.error('error', error.message);
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handpassword = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPassword(values => ({ ...values, [name]: value }))
  }

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
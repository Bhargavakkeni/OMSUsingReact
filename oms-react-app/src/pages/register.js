import react, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import '../css/login.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [passwords, setPassword] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(passwords.password != passwords.confirmpassword){
      alert('Password does not match');
      return false;
    }
    //console.log(username, password);
    try {
      const apiUrl = `http://127.0.0.1:8000/api/get_login`;
      const postLoginDetails ={'username':username,'password':passwords.password};
      const response = await fetch(apiUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postLoginDetails),
      });
      if (response.status != 201) {
        alert('user already exist');
        throw new Error(`error:${response.status}`);
      }else if(response.status == 201){
        alert('registered successfuly');
        const data = await response.json();
        console.log('saved:',data);
        navigate('/login');
      }
    } catch (error) {
      //alert('please try again');
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
        <p>Already a user?<Link to='/login'>Login here</Link></p>
        </div>
      </div>
    </div>
    </>
  )
}
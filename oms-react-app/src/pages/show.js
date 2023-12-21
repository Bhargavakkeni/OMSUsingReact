import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/show.css';

function ShowData({ data }) {
    return (
        <>
            <h2>OMS details</h2>
            <hr/>
            {data.map((item, index) => (
                
                <div key={index} className='tabledata'>
                    <h3>Order- {index + 1}</h3>
                    <table>
                        <tbody>
                            {Object.entries(item).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key.charAt(0).toUpperCase()+key.slice(1)}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                 
                </div>
            ))}
        </>
    );
}

function Show() {
    const [tabledata, setTabledata] = useState([]);
    const { username } = useParams();
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const handleShow = async (event) => {
            try {
                if (username == '') {
                    return alert('please login')
                }
                const apiUrl = `http://127.0.0.1:8000/api/get_orders/${username}`;
                const response = await fetch(apiUrl);
                if (response.status == 200) {
                    console.log('success')

                }
                const data = await response.json();
                if (data) {
                    setTabledata(data);
                    //data = JSON.parse(data);
                    for (let ele of data) {
                        for (let key in ele) {
                            console.log(key, ele[key]);
                        }
                    }
                    console.log(data[0]);
                } else {
                    console.log('error in data');
                }
            } catch {
                console.log('error in url')
            }
        };
        handleShow();
        setLoading(false);
    }, [username]);

    return (
        <>
            <nav>
            <Link to={`/show/${username}`}>Home</Link>
            {username ? <Link to='/login' id='logout'>Logout</Link> : null}
            </nav>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <Link className='btn btn-primary' to='add'>Add</Link>
                        <Link className='btn btn-success' to='edit'>Update</Link>
                        <Link className='btn btn-danger' to='edit'>Delete</Link>
                    </div>
                    <div className='col'>
                        {loading ? (
                            <p>Loading data...</p>
                        ) : (
                            <ShowData data={tabledata} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Show;
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/show.css';

/*
This component is to show all the orders associated with username. It renders after a successful login.
*/


//This function is to render order tables automatically.
function ShowData({ data }) {

    return (
        <>
            <h2>OMS details</h2>
            <hr/>

            {/*
            It is an iterator that gets the item(object), index(int) from the data which is a list of dictionaries(python lang).
            For every iteration we generate div containing table element of html.
            For every object we get its key, value using Object.entries method. It is also an iterator.
            For every iteration we generates row containing key and value. We captilize the first word before printing.
            */}

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

//This is the actual component that handles the web page.
function Show() {

    //we use tabledata to store orders that comes from the server, username which we can get from the url from login component.
    const [tabledata, setTabledata] = useState([]);
    const { username } = useParams();
    const [loading, setLoading] = useState(true);

    //It gets called whenever there is change in username. It gets the orders data from the server and stores it in tabeldata.
    useEffect(() => {

        //this get called to get the data from the server.
        const handleShow = async (event) => {

            try {

                if (username == '') {
                    return alert('Please login')
                }

                const apiUrl = `http://127.0.0.1:8000/api/get_orders/${username}`;

                //establish connection with apiUrl as a end point and through GET method.
                const response = await fetch(apiUrl);

                if (response.status == 200) {
                    console.log('success');
                }else if(response.status != 200){
                    console.log('error in fetching data.');
                    throw new Error(`error:${response.status}`);
                }

                const data = await response.json();

                //if valid data returned store the data in tabledata using setTabledata function.
                if (data) {
                    setTabledata(data);
                    for (let ele of data) {
                        for (let key in ele) {
                            console.log(key, ele[key]);
                        }
                    }
                } else {
                    alert('Please try again after some time.');
                    console.log('error in data');
                }

            } catch(error) {
                console.log('error in url',error.message);
            }

        };

        //calls the handleShow method to fetch the data.
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
                        {/*
                        if loading is false calls the ShowData method to display the orders as tables.
                        */}
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
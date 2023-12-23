import { useState } from 'react';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/add.css'

/*
This component is to lets the user add new order records. It takes user input and sends the data to store it in database.
*/

function AddOrder() {

    //Here we are using inputs object to store all the field values entered by user.
    const [inputs, setInputs] = useState({});
    let { username } = useParams();

    if (username == undefined) {
        username = '';
    }

    //handles user input in the addForm
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    //handles the submit of addForm it sends the data to the server.
    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(inputs);

        try {

            if (username == '') {
                return alert('please login')
            }

            const apiUrl = `http://127.0.0.1:8000/api/get_orders/${username}`;
            console.log(inputs)
            const postOrderDetails = {
                'brand': inputs.brand,
                'shipMethod': inputs.shipMethod,
                'processingDays': inputs.processingDays,
                'processingDaysType': inputs.processingDaysType,
                'min': inputs.min,
                'max': inputs.max,
                'processingDate': inputs.processingDate,
                'availableToPromiseDate': inputs.availableToPromiseDate,
                'cutOff': inputs.cutOff
            }; //data to send to database.

            //establishes connection througn POST method.
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postOrderDetails),
            });

            //after successful posting data it sets the inputs fields to initial value.
            if (response.status != 201) {
                throw new Error(`error:${response.status}`);
            } else {
                const data = await response.json();
                alert('added succesfully');
                setInputs({});
                console.log('saved:', data);
            }

        } catch (error) {
            alert('please try again\nIf you are not logged in please login.');
            console.error('error', error.message);
        }

    };

    return (

        <>
            <nav>
                <Link to={`/show/${username}`}>Home</Link>
                {username ? <Link to='/login' id='logout'>Logout</Link> : null}
            </nav>
            <div className="container">
                <div className="row">
                    <div className='col'>
                        <Link className='btn btn-success' to={`/show/${username}`}>Show</Link>
                        <Link className='btn btn-danger' to={`/show/${username}/edit`}>Edit</Link>
                    </div>
                    <div className='col center'>
                        <form name='omsForm' className='center' onSubmit={handleSubmit}>
                            <h3>
                                OMS
                            </h3>

                            <label>Brand
                                <br />
                                <input type='text' className="form-control" id='brand' name='brand' value={inputs.brand || ''} onChange={handleInputs} required />
                            </label>

                            <br />

                            <label >Ship Method
                                <br />
                                <input type="text" className="form-control" id="shipMethod" name="shipMethod" value={inputs.shipMethod || ''} onChange={handleInputs} required />
                            </label>
                            <br />

                            <label >Processing Days
                                <br />
                                <input type="number" className="form-control" id="processingDays" name="processingDays" value={inputs.processingDays || ''}
                                    onChange={handleInputs} required />
                            </label>
                            <br />

                            <label >Processing Days Type
                                <br />

                                <input type="text" className="form-control" id="processingDaysType" value={inputs.processingDaysType || ''}
                                    name="processingDaysType" onChange={handleInputs} required />
                            </label>

                            <br />

                            <label >Min
                                <br />

                                <input type="number" className="form-control" id="min" name="min" value={inputs.min || ''} onChange={handleInputs} required />
                            </label>

                            <br />

                            <label >Max
                                <br />

                                <input type="number" className="form-control" id="max" name="max" value={inputs.max || ''} onChange={handleInputs} required />
                            </label>

                            <br />

                            <label >Processing Date
                                <br />

                                <input type="date" className="form-control" id="processingDate" name="processingDate" value={inputs.processingDate || ''}
                                    onChange={handleInputs} required /></label>

                            <br />

                            <label >Available To Promise Date
                                <br />
                                <input type="date" className="form-control" id="availableToPromiseDate" name="availableToPromiseDate" value={inputs.availableToPromiseDate || ''}
                                    onChange={handleInputs} required />
                            </label>

                            <br />

                            <label >CutOff
                                <br />

                                <input type="number" className="form-control" id="cutOff" name="cutOff" value={inputs.cutOff || ''} onChange={handleInputs} required />
                            </label>

                            <br />
                            <br />
                            <input type='submit' className='form-control' id='add' name='add' value='Add' />
                            <br />

                            {/*<input type='button' className='form-control' id='show' name='show' value='Show' onClick={handleShow} />*/}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
   
}

export default AddOrder;
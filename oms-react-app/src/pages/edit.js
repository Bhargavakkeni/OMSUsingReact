import { useState } from 'react';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/edit.css';

function Edit() {
    const [inputs, setInputs] = useState({});
    const [tabledata, setTabledata] = useState([])
    let { username } = useParams();

    if (username == undefined) {
        username = '';
    }

    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiUrl = `http://127.0.0.1:8000/api/get_orders/${inputs.updateId}`;
            const fieldUpdate = inputs.fieldUpdate;
            const newValue = inputs.newValue;
            const updateDetails = { 'fieldUpdate': fieldUpdate, 'newValue': newValue, 'username': username };
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateDetails),
            });
            if (response.ok) {
                const data = await response.json();
                alert('updated successfuly');
                setInputs({});
                console.log('updated data', data);
            } else {
                alert('Please enter valid Id');
                console.log('wrong data format');
            }
        } catch (error) {
            console.log('error', error.message);
        }
    };

    const changeType = () => {
        if (inputs.fieldUpdate == 'min' || inputs.fieldUpdate == 'processingDays' || inputs.fieldUpdate == 'max' || inputs.fieldUpdate == 'cutOff') {
            document.getElementById('newValue').type = 'number';
        } else if (inputs.fieldUpdate == 'processingDate' || inputs.fieldUpdate == 'availableToPromiseDate') {
            document.getElementById('newValue').type = 'date';
        } else {
            document.getElementById('newValue').type = 'text';
        }
    };

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiUrl = `http://127.0.0.1:8000/api/get_orders/${inputs.deleteId}`;
            const response = await fetch(apiUrl, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('deleted successfuly');
            } else {
                alert('Please enter valid Id')
            }
        } catch (error) {
            console.log('error', error.message);
        }
    }

    return (
        <>
            <nav>
                <Link to={`/show/${username}`}>Home</Link>
                {username ? <Link to='/oms' id='logout'>Logout</Link> : null}
            </nav>
            <div className="container">
                <div className="row">
                    <div className='col'>
                        <Link className='btn btn-success' to={`/show/${username}`}>Show</Link>
                <Link className='btn btn-primary' to={`/show/${username}/add`}>Add</Link>
                    </div>
                    <div className='col'>
                        <div className='Oms update details'>
                            <h2>OMS update details</h2>
                            <form name='updateForm' id='updateForm' onSubmit={handleUpdateSubmit}>
                                <label>Enter Id to update<span>*</span>
                                    <input type='number' className='form-control' value={inputs.updateId || ''} id='updateId' name='updateId' onChange={handleInputs} required />
                                </label>
                                <label>Select field to update<span>*</span>
                                    <select id='fieldUpdate' className='form-control' name='fieldUpdate' value={inputs.fieldUpdate || ''} onChange={handleInputs} onClick={changeType}>
                                        <option>None</option>
                                        <option value='brand'>Brand</option>
                                        <option value='shipMethod'>Ship Method</option>
                                        <option value='processingDays'>Processing Days</option>
                                        <option value='processingDaysType'>Processing Days Type</option>
                                        <option value='min'>Min</option>
                                        <option value='max'>Max</option>
                                        <option value='processingDate'>Processing Date</option>
                                        <option value='availableToPromiseDate'>Available To Promise Date</option>
                                        <option value='cutOff'>CutOff</option>
                                    </select>
                                </label>
                                <label>Enter new value<span>*</span>
                                    <input type='text' className='form-control' id='newValue' name='newValue' value={inputs.newValue || ''} onChange={handleInputs} required />
                                </label>
                                <input type='submit' id='update' className='form-control' value='Update' />
                            </form>
                        </div>
                    </div>

                    <div className='col'>
                        <h2>OMS delete details </h2>
                        <form name='deleteForm' id='deleteForm' onSubmit={handleDeleteSubmit}>
                            <label>Enter id to delete<span>*</span>
                                <input type='number' className='form-control' id='deleteId' name='deleteId' value={inputs.deleteId || ''} onChange={handleInputs} required />
                            </label>
                            <input type='submit' className='form-control' id='delete' value='Delete' />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit;
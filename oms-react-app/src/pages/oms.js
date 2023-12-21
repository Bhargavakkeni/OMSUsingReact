import { useState } from 'react';
import React from 'react';
import {useParams, Link } from 'react-router-dom';
import '../css/layout.css';
import '../css/oms.css';


function ShowData({ data }) {
    return (
        <>
            <h3>Oms details</h3>
            {data.map((item, index) => (
                <div key={index}>
                    <h3>oms id - {index + 1}</h3>
                    <table>
                        <tbody>
                            {Object.entries(item).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
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

function Oms() {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);
        try {
            const apiUrl = `http://127.0.0.1:8000/api/get_orders/${username}`;
            const postOrderDetails = { inputs };
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postOrderDetails),
            });
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

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try{
            const apiUrl =`http://127.0.0.1:8000/api/get_orders/${inputs.updateId}`;
            const fieldUpdate = inputs.fieldUpdate;
            const newValue = inputs.newValue;
            const updateDetails = {'fieldUpdate':fieldUpdate,'newValue':newValue,'username':username};
            const response = await fetch(apiUrl,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(updateDetails),
            });
            if(response.ok){
                const data = await response.json();
                alert('updated successfuly');
                setInputs({});
                console.log('updated data',data);
            }else{
                console.log('wrong data format');
            }
        }catch(error){
            console.log('error',error.message);
        }
    };

    /*
    const show = (data) =>{
            for(let ele of data){
                for(let key in ele){
                    let s="<tr>"+
                            "<td>"+
                                key+
                            "</td>"+
                            "<td>"+
                                ele[key]+
                            "</td>"+
                        "</tr>"
                    return s;
                }
            }
    };
    */

    const handleShow = async (event) => {
        try {
            if (username == '') {
                return alert('please login')
            }
            const apiUrl = `http://127.0.0.1:8000/api/get_orders/${username}`;
            const response = await fetch(apiUrl);
            if (response.status == 200) {
                alert('success')

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

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try{
            const apiUrl =`http://127.0.0.1:8000/api/get_orders/${inputs.deleteId}`;
            const response = await fetch(apiUrl,{
                method:'DELETE'
            });
            if(response.ok){
                alert('deleted successfuly');
            }else{
                alert('Please try again')
            }
        }catch(error){
            console.log('error',error.message);
        }
    }

    const handleHome = () => {
        setTabledata([]);
    };

    const changeType = () => {
        if(inputs.fieldUpdate == 'min' || inputs.fieldUpdate == 'processingDays' || inputs.fieldUpdate == 'max' || inputs.fieldUpdate == 'cutOff'){
            document.getElementById('newValue').type = 'number';
        }else if(inputs.fieldUpdate == 'processingDate' || inputs.fieldUpdate == 'availableToPromiseDate'){
            document.getElementById('newValue').type = 'date';
        }else{
            document.getElementById('newValue').type = 'text';
        }
    };

    return (
        <>
            <nav>
                <Link to={`/oms/${username}`} id="oms" onClick={handleHome}>Home</Link>
                {username ? null : <Link to="/login" id="login">/Login</Link>}
                {username ? null : <Link to='/register' id="register">Register</Link>}
                {username ? <Link to='/oms' id='logout'>Logout</Link> : null}
            </nav>
            <div className='omsapp'>
                <h1>Oms Page</h1>
                <div className='row'>
                    <div className='col'>
                        <form name='omsForm' onSubmit={handleSubmit}>
                            <h3>
                                Oms
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

                            <input type='button' className='form-control' id='show' name='show' value='Show' onClick={handleShow} />
                        </form>
                    </div>
                    <div className='col'>
                        <div className='Oms update details'>
                            <h2>Oms update details</h2>
                            <form name='updateForm' onSubmit={handleUpdateSubmit}>
                                <label>Enter Id to update
                                    <input type='number' className='form-control' value={inputs.updateId || ''} id='updateId' name='updateId' onChange={handleInputs} required />
                                </label>
                                <label>Select field to update
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
                                <label>Enter new value
                                    <input type='text' className='form-control' id='newValue' name='newValue' value={inputs.newValue || ''} onChange={handleInputs} required/>
                                </label>
                                <input type='submit' id='update' className='form-control' value='Update' />
                            </form>
                        </div>
                    </div>
                    <div className='col'>
                        <h2>Oms Delete </h2>
                        <form name='deleteForm' onSubmit={handleDeleteSubmit}>
                            <label>Enter id to delete
                                <input type='number' className='form-control' id='deleteId' name='deleteId' value={inputs.deleteId || ''} onChange={handleInputs} required />
                            </label>
                            <input type='submit' className='form-control' id='delete' value='Delete' />
                        </form>
                    </div>
                    <div id='showTable'>
                        <div className='row'>
                            <div className='col'>
                                <ShowData data={tabledata} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Oms;
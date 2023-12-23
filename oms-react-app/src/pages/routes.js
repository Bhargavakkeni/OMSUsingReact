import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import Register from './register';
import Reset from './reset';
import Login from './login';
import Oms from './oms';
import Show from './show';
import AddOrder from './add';
import Edit from './edit';

/*
This component is the soul for this application.
It defines path to every single component of this application.
The first Route element with path='/' is where the controler will go. Usually here we use some layout component for navigation.
second Route with 'index' is the first page or component to be rendered when server get started.
Here ':username' means it is expecting some variable just like <int:id> in Django.
*/

export default function Paths() {

    return (

        <div className="Path">

            <BrowserRouter>

                <Routes>

                    <Route path="/">

                        <Route index element={<Login />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='reset' element={<Reset />} />
                        <Route path='oms' element={<Oms />} />
                        <Route path='oms/:username' element={<Oms />} />
                        <Route path='show' element={<Show />} />
                        <Route path='show/:username' element={<Show />} />
                        <Route path='show/:username/add' element={<AddOrder />} />
                        <Route path='show/:username/edit' element={<Edit />} />

                    </Route>

                </Routes>

            </BrowserRouter>
            
        </div>

    );

}
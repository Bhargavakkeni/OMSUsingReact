import {useState} from 'react';
import {BrowserRouter ,Route,Link,Routes} from 'react-router-dom'
import React from 'react';
import Register from './register';
import Layout from './layout';
import Reset from './reset';
import Login from './login';
import Oms from './oms';
import Show from './show';
import AddOrder from './add';
import Edit from './edit';

export default function Paths(){
    return (
        <div className="Path">
                <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Login />} />
                        <Route path='login' element={<Login/>} />
                        <Route path='register' element={<Register />} />
                        <Route path='reset' element={<Reset />} />
                        <Route path='oms' element={<Oms/>}/>
                        <Route path='oms/:username' element={<Oms/>}/>
                        <Route path='show' element={<Show/>}/>
                        <Route path='show/:username' element={<Show/>}/>
                        <Route path='show/:username/add' element={<AddOrder />}/>
                        <Route path='show/:username/edit' element={<Edit />}/>

                    </Route>
                </Routes>
            </BrowserRouter>
          <header className="App-header">
          </header>
        </div>
    
        
      );
}
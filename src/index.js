import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './layouts/HomePage'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <HomePage />
    </BrowserRouter>,
    document.getElementById('container')
);
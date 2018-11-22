import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layouts/Layout'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>,
    document.getElementById('container')
);
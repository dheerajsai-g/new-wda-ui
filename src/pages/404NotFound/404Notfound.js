import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () =>
  <div className='container my-5'>
    <h3 className='my-3'>404 page not found</h3>
    <p className='my-2'>We are sorry but the page you are looking for does not exist.</p>
    <Link to="/"><button className='btn btn-primary my-2'>Go To Home</button></Link>
  </div>

export default NotFound

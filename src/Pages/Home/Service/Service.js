import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({service}) => {

  const {_id, name, img, price, description} = service;
  const navigate = useNavigate();
  const navigateToServiceDetail = id =>{
      navigate(`/service/${id}`)
  }
  return (
    <div className='service'>
      <img width={'100%'} src={img} alt="" />
      <h2>{name}</h2>
      <p className='text-danger'>Price : {price}</p>
      <p><small>{description}</small></p>
      <button onClick={() => navigateToServiceDetail(_id)} className='btn btn-primary'>Book : {name}</button>
    </div>
  );
};

export default Service;
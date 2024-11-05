import React from 'react'
import "./EmployeeList.css";
import Axios from "axios";
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';



const EmployeeList = () => {
    const [employeeObj,setEmployeeObj]=useState({
        id:"",
        name:"",
        salary:""
    });

    const handleChange=(event)=>{
        setEmployeeObj({
            ...employeeObj,[event.target.name]:event.target.value,
        })
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const res=await Axios.post("http://localhost:5000/createEmployee",employeeObj)
        console.log(res); 
        getAllEmployees();
        setEmployeeObj({ id:"",
            name:"",
            salary:""});

    }
//getting
    const [empData,setEmpData]=useState([]);
    const getAllEmployees=async()=>{
        const res=await Axios.get("http://localhost:5000/retriveEmployees")
        setEmpData(res.data);
    }
    useEffect(()=>{
        getAllEmployees();
    },[]);

//update

//delete
const handleDelete=async(id)=>{
    const res=await Axios.delete(`http://localhost:5000/deleteEmployee/${id}`);
    if(res.status===200){
        getAllEmployees();
    }
    
}

  return (
    <div className='total_Page'>
        <div className="header">
            IMMENSPHERE
        </div>
        <div className="container">
            
            <fieldset >
            <form onSubmit={handleSubmit}>
                <h1>Create Employee details</h1>
                <div className="input-box">
                    <label htmlFor="id">Emp ID :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input 
                        type="text" 
                        placeholder='Enter id of the employee' 
                        id='id'
                        name='id'
                        required 
                        value={employeeObj.id}                      
                        onChange={handleChange}
                        />
                </div>
                <div className="input-box">
                    <label htmlFor="name">Emp Name :</label>
                    <input 
                        type="text" 
                        placeholder='Enter name of the employee...' 
                        id='name'
                        name='name'
                        required 
                        value={employeeObj.name}                      
                        onChange={handleChange}
                        />
                </div>
                <div className="input-box">
                    <label htmlFor="sal">Emp Salary :</label>
                    <input 
                        type="text" 
                        placeholder='Enter salary of the employee' 
                        id='sal'
                        name='salary'
                        required 
                        value={employeeObj.salary}                      
                        onChange={handleChange}
                        />
                </div>
                <button style={{color:"white",backgroundColor:'blue'}} type='submit'>Create</button>               
            </form>
            </fieldset>
           
            
        </div>
            <div className="table-sec">
                
                <table>
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>SALARY</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empData.map((item,i)=>(
                            <tr>
                                <th>{i+1}</th>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.salary}</td>
                                <td className='td'>
                                    <div className='actions'>
                                        <button id='btn'><NavLink to={`/updateEmp/${item._id}`} className="navlink">Update</NavLink></button>&nbsp;                           
                                        <button onClick={()=>handleDelete(item._id)}> Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
    </div>
  )
}

export default EmployeeList;
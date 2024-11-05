import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  Axios  from 'axios';

const UpdateEmp = () => {

    const [employeeObj,setEmployeeObj]=useState([{
        id:"",
        name:"",
        salary:""
    }]);
    const {id}=useParams();
    const getEmployee=async()=>{
        const res=await Axios.get(`http://localhost:5000/retriveEmployees/${id}`);
        console.log(res);
        setEmployeeObj({
            id:res.data.id,
            name:res.data.name,
            salary:res.data.salary,
        })
    }
    useEffect(()=>{
        getEmployee();
    },[]);

    const handleChange=(event)=>{
        setEmployeeObj({
            ...employeeObj,[event.target.name]:event.target.value,
        })
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        console.log(employeeObj);
        const res=await Axios.put(`http://localhost:5000/updateEmployee/${id}`,employeeObj);
        console.log(res); 
        if(res.status===200){
            window.location="/";
        }
        
    }

  return (
    <div style={{height:"100vh",width:"100vw",display:"flex" ,alignItems:"center",justifyContent:"center",backgroundColor:"rgb(154, 199, 239)"}}>
        <fieldset style={{backgroundColor:"#E6E6FA",fontWeight:"bold"}}>
            <form onSubmit={handleSubmit} action='/'>
            <h2>Update Employee Details</h2>
                <div className="input-box">
                    <label htmlFor="id">Emp ID :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input 
                        type="text" 
                        placeholder='Enter id of the employee' 
                        id='id'
                        name='id'
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
                        value={employeeObj.salary}                      
                        onChange={handleChange}
                        />
                </div>
                <button style={{color:"white",backgroundColor:'blue',}} type='submit'>update</button>
            </form>
        </fieldset>
    </div>
  )
}

export default UpdateEmp




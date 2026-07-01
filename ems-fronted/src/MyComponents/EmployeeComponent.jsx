import React, { useEffect } from 'react'
import {useState} from 'react'
import { creatEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';


const EmployeeComponent = () => {
const [firstName,setFirstName] = useState ('');
const [lastName,setlastName] = useState ('');
const [email,setemail] = useState ('');

const {id} = useParams();

const [errors,setErrors] = useState({
  firstName: '',
  lastName: '',
  email: '',
})

const navigator = useNavigate();

useEffect(() =>{
 if(id){
  getEmployee(id).then((response) => {
    setFirstName(response.data.firstName);
    setlastName(response.data.lastName);
    setemail(response.data.email);
  }).catch(error => {
    console.log(error);
  })
 }
},[id])

function handleFirstName (e){
  setFirstName(e.target.value);
}

function handleLastName (e){
  setlastName(e.target.value);
}

function handleemail (e){
  setemail(e.target.value);
}

function saveOrUpdateEmployee (e){
  e.preventDefault();

  if(validateForm()){
    const employee = {firstName,lastName,email}
  console.log(employee)

    if(id){
      updateEmployee(id,employee).then((response) =>{
        console.log(response.data);
        navigator('/employees');
      }).catch((error) => {
        console.log(error);
      })
    }else{
creatEmployee(employee).then((response) => {
    console.log(response.date);
    navigator('/employees') 
  } ).catch((error) => {
    console.log(error);
  })
    } 
  }
}

  function validateForm () {
     let valid = true;
     const errorcopy = {... errors};

    if(firstName.trim()){
      errorcopy.firstName='';
    }
    else{
      errorcopy.firstName='Name Is Required';
      valid = false;
    }
    if(lastName.trim()){
      errorcopy.lastName='';
    }
    else{
      errorcopy.lastName = 'Last Name Is Rquires';
      valid = false;
    }
    if(email.trim()){
      errorcopy.email='';
    }
    else{
      errorcopy.email='Email Is Required';
      valid = false;

    }

    setErrors(errorcopy);
    return valid;

  }
 
  function pageTitle(){
   if(id){
    return  <h2 className='text-center'>update Employee</h2>
   }
   else{
    return <h2 className='text-center'>Add Employee</h2>
   }

  }
  return (
    <div className='container'>
      <br></br>
      <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
              pageTitle()
            }
             {/* <h2 className='text-center'>Add Employee</h2> */}
             <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                     <label className='form-label'>Employee First Name</label>
                     <input type='text' placeholder='Enter Your First Name' name='firstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid': ''}`} onChange={handleFirstName}></input>
                     {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                </div>
                 <div className='form-group mb-2'>
                     <label className='form-label'>Employee Last Name</label>
                     <input type='text' placeholder='Enter Your Last Name' name='lastName' value={lastName}className={`form-control ${errors.lastName ? 'is-invalid': ''}`}  onChange={handleLastName}></input>
                                          {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

                </div>
                 <div className='form-group mb-2'>
                     <label className='form-label'>Employee Email</label>
                     <input type='password' placeholder='Enter Employee Email' name='email' value={email}className={`form-control ${errors.email ? 'is-invalid': ''}`}  onChange={handleemail}></input>
                                          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                </div>
                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
              </form>
             </div>
          </div>
      </div>
    </div>
  )
}

export default EmployeeComponent

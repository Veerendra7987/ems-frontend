import React from 'react'
import {useState,useEffect} from 'react'
import { listEmployees,deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])
  
  const navigator = useNavigate(); 

  useEffect(() =>{
   getAllEmployees();
  },[])

  function getAllEmployees(){
     listEmployees().then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

 function addNewEmployee () {
   navigator('/add-employee')
 }

 function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
 }

 function removeEmployee(id){
  console.log(id);
  deleteEmployee(id).then((response) =>{
    getAllEmployees();
  }).catch(error => {
    console.log(error);
  })
 }


  return (
    <div className='container my-2'>
        <h2>List Of Employees</h2>
            <button type='button' className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee firstName</th>
              <th>Employee lastName</th>
              <th>Employee emailID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map(employee => 
               <tr key={employee.id}>
                 <td>{employee.id}</td>
                 <td>{employee.firstName}</td>
                 <td>{employee.lastName}</td>
                 <td>{employee.email}</td>
                 <td>
                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>update</button>
                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>delete</button>
                 </td>
               </tr>)
            }
               
          </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent

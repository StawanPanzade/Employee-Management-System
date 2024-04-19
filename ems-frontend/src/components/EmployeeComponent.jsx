import { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, SetFirstName] = useState('')
    const [lastName, SetLastName] = useState('')
    const [email, SetEmail] = useState('')

    const  handleFirstName = (e) => SetFirstName(e.target.value);
    
    const handleLastName = (e) => SetLastName(e.target.value);
    
    const handleEmail = (e) => SetEmail(e.target.value);

    const {id} = useParams(); 

    const [errors, setErrors] = useState({
        fisrtName: '',
        lastName: '',
        email:''
    })

    function validateFrom(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.fisrtName = '';
        }else {
            errorsCopy.fisrtName = 'First name is Required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else {
            errorsCopy.email = 'Email is required'
        }

        setErrors(errorsCopy);

        return valid;
    }

    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                SetFirstName(response.data.firstName);
                SetLastName(response.data.lastName);
                SetEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    },[id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if(validateFrom()){

            const employee = {firstName, lastName, email}
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }

            
    
            
        }

        
    }

    function pageTitle(){
        if(id){
            return    <h2 className='text-center'>Update Employee</h2>  
        }else{
            return  <h2 className='text-center'>Add Employee</h2>  
        }
    }
    
return (
    <div className='container'>
        <br /><br />
    <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                {/* <h2 className='text-center'>Add Employee</h2> */}
                <div className='card-body'>
                    <form action="">
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input  
                                    type="text"
                                    placeholder='Enter Employee First Name' 
                                    name='firstName' 
                                    value={firstName} 
                                    className={`form-control ${ errors.fisrtName ? 'is-invalid': ''}`} 
                                    onChange={handleFirstName}
                            />
                            { errors.fisrtName && <div className='invalid-feedback'>{ errors.fisrtName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input  
                                    type="text"
                                    placeholder='Enter Employee Last Name' 
                                    name='lastName' 
                                    value={lastName} 
                                    className={`form-control ${ errors.lastName ? 'is-invalid': ''}`}
                                    onChange={handleLastName}
                            />
                            { errors.lastName && <div className='invalid-feedback'>{ errors.lastName}</div>}
                        </div>
                            
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input  
                                    type="text"
                                    placeholder='Enter Employee Email' 
                                    name='email'
                                    value={email} 
                                    className={`form-control ${ errors.email ? 'is-invalid': ''}`}
                                    onChange={handleEmail}
                            />
                            { errors.email && <div className='invalid-feedback'>{ errors.email}</div>}
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
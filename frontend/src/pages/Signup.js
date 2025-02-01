import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleError } from '../utils';
import { handleSuccess } from '../utils';


function Signup() {

    const[signupInfo, setSignupInfo]= useState({
        name:'',
        email:'',
        password:'',
    })

    const navigate = useNavigate(); 

    const handleChange=  (e)=>{
        const {name,value}=e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name]= value;
        setSignupInfo(copySignupInfo);
    }
    
    const handleSignup= async (e)=>{
        e.preventDefault();
    const {name,email,password}= signupInfo;
    if(!name || !email || !password){
        return handleError('name,email,pasword are required')
    } 
    try {
        const url ="https://deploy-mern-app-five.vercel.app/auth/signup";
        // ';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        console.log(response)
            const result = await response.json();
            console.log(result);
            const { success , message , error} = result;
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                    navigate('/signin')
                },1000)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
        } catch (error) {
        handleError(error);
        
    }
    }

  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlfor='name'>Name</label>
                <input
                onChange={handleChange}
                tpye='text'
                name='name'
                autoFocus
                placeholder='Enter your name...'
                value={signupInfo.name}
                />
            </div>
            <div>
                <label htmlfor='email'>Email</label>
                <input
                onChange={handleChange}
                tpye='email'
                name='email'
                placeholder='Enter your email...'
                value={signupInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                tpye='password'
                name='password'
                placeholder='Enter your password...'
                value={signupInfo.password}
                />
            </div>
            <button tpye='Submit'>Signup</button>
            <span>Already have an account? 
             <Link to="/signin">Signin</Link>
             </span>
        </form>

        <ToastContainer />
    </div>
  )
}

export default Signup

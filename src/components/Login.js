import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from './validate';
import { notify } from './toast';
import styles from './Login.module.css';

const Login = () => {

    const [data, setData] = useState({
        email : "",
        password : "",
    });

    const [errors, setErrors] = useState({});
    const [touched,setTouched] = useState({});

    useEffect(()=>{
        setErrors(validate(data, "login"))
    },[data, touched]);

    const changeHandler = event =>{
              setData({...data, [event.target.name] : event.target.value})
    }
    const focuseHandler = event =>{
        setTouched({...touched, [event.target.name] : true})
    }

    const submitHandler = event =>{

        event.preventDefault();
        if(!Object.keys(errors).length){
            notify("You loged up successfully!", "success")
        }else{
            notify("Invalid data!", "error");
            setTouched({
                email : true,
                password :true,
            })
        }

    }
    return (
        <div className = {styles.container}>
            <form onSubmit = {submitHandler} className = {styles.formContainer}>
                <h2 className = {styles.header}>Sign Up</h2>
                <div className = {styles.formField}>
                    <lable>Email</lable>
                    <input
                    className = {(errors.email && touched.email) ? styles.uncompleted : styles.formInput} 
                    type = "text"
                     name = "email"
                     value = {data.email}
                     onChange = {changeHandler} 
                    onFocus = {focuseHandler}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className = {styles.formField}>
                    <lable>Password</lable>
                    <input 
                    className = {(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                    type = "password"
                     name = "password"
                     value = {data.password}
                     onChange = {changeHandler}
                     onFocus = {focuseHandler}/>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className = {styles.formButton}>
                    <Link to = "/signup">Sign Up</Link>
                    <button type = "submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
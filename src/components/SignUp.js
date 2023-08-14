import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from './validate';
import { notify } from './toast';
import styles from './SignUp.module.css';

const SignUp = () => {

    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword: "",
        isAccepted : false
    });

    const [errors, setErrors] = useState({});
    const [touched,setTouched] = useState({});

    useEffect(()=>{
        setErrors(validate(data))
    },[data, touched]);

    const changeHandler = event =>{
          if(event.target.name === "isAccepted"){
              setData({...data, [event.target.name] : event.target.checked})
          }else{
              setData({...data, [event.target.name] : event.target.value})
          }
    }
    const focuseHandler = event =>{
        setTouched({...touched, [event.target.name] : true})
    }

    const submitHandler = event =>{

        event.preventDefault();
        if(!Object.keys(errors).length){
            notify("You signed up successfully!", "success")
        }else{
            notify("Invalid data!", "error");
            setTouched({
                name : true,
                email : true,
                password :true,
                confirmPassword : true,
                isAccepted : true
            })
        }

    }
    return (
        <div className = {styles.container}>
            <form onSubmit = {submitHandler} className = {styles.formContainer}>
                <h2 className = {styles.header}>Sign Up</h2>
                <div className = {styles.formField}>
                    <lable>Name</lable>
                    <input
                    className = {(errors.name && touched.name) ? styles.uncompleted : styles.formInput}
                     type = "text"
                     name = "name" 
                    value = {data.name}
                     onChange = {changeHandler} 
                    onFocus = {focuseHandler}/>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                <div className = {styles.formField}>
                    <lable>Confirm Passsword</lable>
                    <input
                    className = {(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput}
                    type = "passsword"
                     name = "confirmPassword"
                     value = {data.confirmPassword} 
                     onChange = {changeHandler}
                    onFocus = {focuseHandler}/>
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className = {styles.formField}>
                    <div className = {styles.checkBoxContainer}>
                    <lable>I accepted terms of privacy policy.</lable>
                    <input
                     type = "checkbox"
                     name = "isAccepted"
                     value = {data.isAccepted}
                     onChange = {changeHandler}
                     onFocus = {focuseHandler}/>
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className = {styles.formButton}>
                    <a href = "#">Login</a>
                    <button type = "submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
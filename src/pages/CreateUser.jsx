import React, { useState } from "react";
import "./createuser.css";
import { useDispatch } from "react-redux";
import { postData } from "../redux/slices/Userslice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginBox() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const dispatch = useDispatch()



    const handleChange = ( event) => {
        // console.log(event.target.name)
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setFormErrors({ ...formErrors, [event.target.name]: "" });
    };

    const formValidation = (e) => {
        e.preventDefault();


        const newErrors = {
            name: formData.name === "" ? 'Name cannot be blank' : '',
            email: formData.email === "" ? 'Email cannot be blank' : '',
            phone: formData.phone === "" ? 'Number cannot be blank' : ''
        };

        setFormErrors(newErrors);
         
        if(formData.name!=="" && formData.email!=="" && formData.phone!==""){
                dispatch(postData(formData)).then(data=>{
                    if(data.payload.id){
                        toast.success(" Wow so easy!");
                      
                    }
                    else{
                        toast.error("Something went wrong!!")
                    }
                })
        }

        setFormData({
            name :"",
            email: "",
            phone:""
        })


    };


    return (
        <div className="login-box">
            <h2>Create User</h2>
            <form onSubmit={formValidation}>
                <div className="user-box">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={(e) => handleChange( e)}
                        value={formData.name}
                        name="name"
                    />
                    <span className="err">{formErrors.name}</span>
                </div>
                <div className="user-box">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => handleChange( e)}
                        value={formData.email}
                        name="email"
                    />
                    <span className="err">{formErrors.email}</span>
                </div>
                <div className="user-box">
                    <label htmlFor="number">Number</label>
                    <input
                        onChange={(e) => handleChange( e)}
                        value={formData.phone}
                        name="phone"
                    />
                    <div className="err">{formErrors.phone}</div>
                </div>
                <button className="submitbtn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginBox;

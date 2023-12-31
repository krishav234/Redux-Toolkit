import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createuser.css";
import {
  postData,
  getUserById,
  putData,
} from "../redux/slices/Userslice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

function CreateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userData: allUsers } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: "" });
  };

  const formValidation = (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name === "" ? "Name cannot be blank" : "",
      email: formData.email === "" ? "Email cannot be blank" : "",
      phone: formData.phone === "" ? "Number cannot be blank" : "",
    };

    setFormErrors(newErrors);

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phone === ""
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    dispatch(postData(formData))
      .then((data) => {
        if (data?.payload?.id) {
          toast.success("Wow so easy!");
          setFormData({
            name: "",
            email: "",
            phone: "",
          });
        } else {
          toast.error("Something went wrong!!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && id !== "null") {
      setEditMode(true);
      dispatch(getUserById(id)).then((data) => {
        if (data) {
          setFormData({
            name: data?.payload?.name,
            email: data?.payload?.email,
            phone: data?.payload?.phone,
          });
        } else {
          toast.error("User not found");
        }
      });
    }
  }, [dispatch, id]);

  const navigate = useNavigate();

  const editUser = (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name === "" ? "Name cannot be blank" : "",
      email: formData.email === "" ? "Email cannot be blank" : "",
      phone: formData.phone === "" ? "Number cannot be blank" : "",
    };

    setFormErrors(newErrors);

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phone === ""
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    dispatch(putData({ formData, id }))
      .then((data) => {
        if (data?.payload?.id) {
          toast.success("Wow so easy!");
          setFormData({
            name: "",
            email: "",
            phone: "",
          });
          navigate("/userlist");
        } else {
          toast.error("Something went wrong!!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-box">
      <h2>{editMode ? "Edit User" : "Create User"}</h2>
      <form onSubmit={id !== "null" ? editUser : formValidation}>
        <div className="user-box">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => handleChange(e)}
            value={formData.name}
            name="name"
          />
          <span className="err">{formErrors.name}</span>
        </div>
        <div className="user-box">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            value={formData.email}
            name="email"
          />
          <span className="err">{formErrors.email}</span>
        </div>
        <div className="user-box">
          <label htmlFor="number">Number</label>
          <input
            onChange={(e) => handleChange(e)}
            value={formData.phone}
            name="phone"
          />
          <div className="err">{formErrors.phone}</div>
        </div>
        <button className="submitbtn" type="submit">
          {loading ? <FaSpinner className="spin" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;

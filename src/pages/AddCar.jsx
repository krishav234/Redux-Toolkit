import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import {
  postCarData,
  putCarData,
  getCarById,
} from "../redux/slices/Gaadislice";
import { useNavigate, useParams } from "react-router-dom";

const AddCar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(useSelector((state)=>state.cars));
  const { carData: allCars } = useSelector((state) => state.cars);
  const [editMode, setEditMode] = useState(false);

  const [carFormData, setCarFormData] = useState({
    name: "",
    brand: "",
    year: "",
  });

  const [carFormErr, setCarFormErr] = useState({
    name: "",
    brand: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setCarFormData({ ...carFormData, [e.target.name]: e.target.value });
    setCarFormErr({ ...carFormErr, [e.target.name]: "" });
  };

  const formValidation = (e) => {
    e.preventDefault();

    const newErrors = {
      name: carFormData.name === "" ? "Name cannot be blank" : "",
      brand: carFormData.brand === "" ? "Brand cannot be blank" : "",
      year: carFormData.year === "" ? "Year cannot be blank" : "",
    };

    setCarFormErr(newErrors);

    if (newErrors.name || newErrors.brand || newErrors.year) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    dispatch(postCarData(carFormData))
      .then((carData) => {
        if (carData?.payload?.id) {
          toast.success("Car added successfully!");
          setCarFormData({
            name: "",
            brand: "",
            year: "",
          });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
    }

      useEffect(() => {
    if (id && id !== "null") {
      setEditMode(true);
      dispatch(getCarById(id)).then((carData) => {
        if (carData) {
          setCarFormData({
            name: carData?.payload?.name || "",
            brand: carData?.payload?.brand || "",
            year: carData?.payload?.year || "",
          });
        } else {
          toast.error("Car not found");
        }
      });
    }
  }, [dispatch, id]);

  const navigate = useNavigate();

    const editCar = (e) => {
      e.preventDefault();

      const newErrors = {
        name: carFormData.name === "" ? "Name cannot be blank" : "",
        brand: carFormData.brand === "" ? "Brand cannot be blank" : "",
        year: carFormData.year === "" ? "Year cannot be blank" : "",
      };

      setCarFormErr(newErrors);

      if (newErrors.name || newErrors.brand || newErrors.year) {
        toast.error("Please fill in all fields!");
        return;
      }

      setLoading(true);

      dispatch(putCarData({ carFormData, id }))
        .then((carData) => {
          if (carData?.payload?.id) {
            toast.success("Car updated successfully!");
            setCarFormData({
              name: "",
              brand: "",
              year: "",
            });
            navigate("/carlist");
          } else {
            toast.error("Something went wrong");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return (
      <>
        <div className="login-box">
          <h2>{editMode ? "Edit Car" : "Add Car"}</h2>
          <form onSubmit={id !== "null"? editCar : formValidation}>
            <div className="user-box">
              <label htmlFor="name">Car Name</label>
              <input
                onChange={(e) => handleChange(e)}
                value={carFormData.name}
                name="name"
              />
              <span className="err">{carFormErr.name}</span>
            </div>
            <div className="user-box">
              <label htmlFor="brand">Car Brand</label>
              <input
                onChange={(e) => handleChange(e)}
                value={carFormData.brand}
                name="brand"
              />
              <span className="err">{carFormErr.brand}</span>
            </div>
            <div className="user-box">
              <label htmlFor="year">Year</label>
              <input
                onChange={(e) => handleChange(e)}
                value={carFormData.year}
                name="year"
              />
              <div className="err">{carFormErr.year}</div>
            </div>
            <button className="submitbtn" type="submit">
              {loading ? <FaSpinner className="spin" /> : "Submit"}
            </button>
          </form>
        </div>
      </>
    );
  };


export default AddCar;

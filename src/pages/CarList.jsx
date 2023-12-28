import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarData, getCarData } from "../redux/slices/Gaadislice";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";


const CarList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarData());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteCarData(id)).then((data) => {
      if (data.payload.id) {
        dispatch(getCarData());
      }
    });
  };

  const navigate = useNavigate();

  const { loader, error, carData } = useSelector((state) => state.cars);

  useEffect(() => {}, [carData]);

  return (
    <>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Car Brand</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carData?.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.brand}</td>
                <td>{data.year}</td>
                <td className="tabledata">
                <AiFillEdit
                    onClick={() => navigate(`/addcar/${data.id}`)}
                    className="editbtn"
                  />

                  <AiFillDelete
                    onClick={() => handleDelete(data.id)}
                    className="editbtn"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CarList;

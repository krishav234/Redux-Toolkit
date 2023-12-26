import React, { useEffect } from "react";
import "./userlist.css";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData, getUserData } from "../redux/slices/Userslice";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const handleDelete = (id) =>{
    dispatch(deleteUserData(id)).then(data=>{
      if(data.payload.id){
        dispatch(getUserData());
      }
    })

  }

  const navigate = useNavigate()

  const { loader, error, userData } = useSelector((state) => state.user);



  return (
    <div className="table">
      {loader === true  ? (
        <ClipLoader color="#36D7B7" loading={loader} size={100} className="loader"/>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td className="tabledata">
                  <AiFillEdit onClick={()=>navigate(`createuser/${data.id}`)} className="editbtn" />
                  <AiFillDelete onClick={()=>handleDelete(data.id)} className="editbtn" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;

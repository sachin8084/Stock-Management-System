import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios';
import './staff.css';


function StaffDetail() {
  const { staffId } = useParams();
  const [staffMember, setStaffMember] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchData();
  }, [staffId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/staff/${staffId}`); // Replace with your actual API endpoint
      const data = response.data;
      setStaffMember(data);
    } catch (error) {
      console.error(`Error fetching staff data for ID ${staffId}:`, error);
    }
  }; 

  const handleDeletestaff = () => {
    axios.delete(`http://localhost:5000/staff/${staffId}`)
    .then((response) => {
        navigate('/Staff/list');
    })
  .catch((error) => {
        console.error('Error deleting employee:',error);
  });
      }

   const handleShowConfirmation = () => {
       setShowConfirmation(true);
   };


  // Function to navigate back to StaffList component
  const navigateBack = () => {
    navigate('/staff/list');
  };

  return (
    <div className='container'>
        <section>
      { staffMember ? (
        <div className='det'>
           <h2>Staff Details</h2>
        <div className='details'>
          <p><strong>Name:</strong> {staffMember.Name}</p>
          <p><strong>Date of Joining:</strong> {staffMember.Date_of_joining}</p>
          <p><strong>Salary:</strong> {staffMember.Salary}</p>
          <p><strong>Address:</strong> {staffMember.Address}</p>
          <p><strong>Phone:</strong> {staffMember.Phone_no}</p>
        </div>
        <button onClick={handleShowConfirmation}>Delete staff</button> 
        {showConfirmation && (
             <div className='confirmation-dialog'>
             <p>Are you sure want to delete this staff details</p>
             <button onClick={handleDeletestaff}>Yes</button>
             <button onClick={ () => setShowConfirmation(false)}>No</button>
             </div>
        )} 
           </div>
      ) : (
        <p>Loading...</p>
      )}
         </section>
      {/* Button to navigate back to StaffList */}
      
    </div>
  );
}

export default StaffDetail;

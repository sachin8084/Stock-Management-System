import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch staff data when the component mounts
    axios.get('http://localhost:5000/staff')
      .then((response) => {
        setStaff(response.data);
        console.log('Staff Details:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  }, []);

  // Function to navigate to StaffDetail component
  const navigateToStaffDetail = (staffId) => {
    navigate(`/staff/${staffId}`);
  };

  return (
    <div>
      <section>
      <h1>Staff List</h1>
      <ul>
        {staff.map((staffMember) => (
          <li key={staffMember.Staff_id}>
            <button onClick={() => navigateToStaffDetail(staffMember.Staff_id)}>View Details</button>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
}

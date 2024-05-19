import React, { useState } from 'react';
import './staff.css';
import axios from 'axios';


export default function Updatestaff() {
    const [Name, setName] = useState('');
    const [Staff_id, setid] = useState('');
    const [Date_of_joining, setdate] = useState('');
    const [Salary, setsalary] = useState('');
    const [Address, setaddress] = useState('');
    const [Phone_no, setno] = useState('');

    const handleUpdate = async (event) => {
        event.preventDefault();

      const updateStaff = {
        Name,
        Date_of_joining,
        Salary,
        Address,
        Phone_no, 
      };

      console.log("Sending data to the server:", updateStaff); // Log the data being sent to the server
  
      axios.put(`http://localhost:5000/staff/update/${Staff_id}`, updateStaff)
                .then(response => {
         console.log("Response from server:", response.data); // Log the response from the server
      })
      .catch(error => {
        console.error("Error sending data to server:", error); // Log any error that occurs
      });
  };

    return (
      <div className='container'>
        <section>
              <div className='box'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Staff Details</h2>
                    <div className='input-box'>
                       <input type='text' value={Name} onChange={(e) =>setName(e.target.value)} required />
                       <label>Name</label>
                    </div>
                    <div className='input-box'>
                       <input type='number' value={Staff_id} onChange={(e) =>setid(e.target.value)} required />
                       <label>Staff_id</label>
                    </div>
                    <div className='input-box'>
                       <input type='text' value={Date_of_joining} onChange={(e) =>setdate(e.target.value)} required />
                       <label>Date_of_joining</label>
                    </div>
                    <div className='input-box'>
                       <input type='number' value={Salary} onChange={(e) =>setsalary(e.target.value)} required />
                       <label>Salary</label>
                    </div>
                    <div className='input-box'>
                       <input type='text' value={Address} onChange={(e) =>setaddress(e.target.value)} required />
                       <label>Address</label>
                    </div>
                    <div className='input-box'>
                       <input type='number' value={Phone_no} onChange={(e) =>setno(e.target.value)} required />
                       <label>Phone_no</label>
                    </div>
                     <button type='submit'>Update</button>
                </form>
              </div>
        </section>
      </div>
    );
  

    }

import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import './staff.css';

export default function Staff1() {
    const navigate = useNavigate();
    const buttonClickHandler = (e) => {
          const button = e.target;
          const buttonText = button.textContent;
          if(buttonText=="Add Staff") navigate('/staff/create');
           else if(buttonText=="Update Staff") navigate('/Staff/update');
           else if(buttonText=="Staff Details") navigate('/Staff/list');
           else if(buttonText=="Remove Staff") navigate('/staff/remove');
           else if(buttonText=="Dashboard") navigate('/dashboard');
    };
         
      return(
        <div className="staff-container">
            {
                <section>
                    <div className="options">
                        <h2>Staff</h2>
                        <br/>
                <button onClick={buttonClickHandler}>Add Staff</button>
                <button onClick={buttonClickHandler}>Update Staff</button>
                <button onClick={buttonClickHandler}>Staff Details</button>
                <button onClick={buttonClickHandler}>Remove Staff</button>
                <button onClick={buttonClickHandler}>DashBoard</button>
                    </div>
                </section>
            }
        </div>

      )
    
}

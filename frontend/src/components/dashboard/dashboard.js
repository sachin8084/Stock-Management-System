import React from 'react';
import './dashboard.css';
import {useNavigate} from 'react-router-dom';

export default function DashBoard()
{
    const navigate = useNavigate();
    const buttonClickHandler =(e) => 
   {
      const button = e.target;
      const buttonText = button.textContent;
      navigate(`/${buttonText}`);
   };
     const redirTo = () => {
          navigate('/');
     }

   return(

    <div className="dash-container">
       
        <section>
            <div className="options">
                <h2>Welcome</h2>
                <br/>
                <button onClick={buttonClickHandler}>customer</button>
                <button onClick={buttonClickHandler}>product</button>
                <button onClick={buttonClickHandler}>orders</button>
                <button onClick={buttonClickHandler}>supplier</button>
                <button onClick={buttonClickHandler}>prod_supp</button>
                <button onClick={buttonClickHandler}>staff</button>
                <button onClick={buttonClickHandler}>categories</button>
                <button onClick={buttonClickHandler}>stock</button>
                <button onClick={redirTo}>Sign Out</button>

            </div>
        </section>
        
    </div>
)
}



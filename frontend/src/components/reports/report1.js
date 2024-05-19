import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/customer-orders')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
  }, []);

  return (
    <div>
      <h1>Customer Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order ID</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.Order_id}>
              <td>{item.Name}</td>
              <td>{item.Order_id}</td>
              <td>{item.Order_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrders;

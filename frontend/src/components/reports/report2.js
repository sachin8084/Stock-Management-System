
// ProductSupplierList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductSupplierList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend endpoint
    axios.get('http://localhost:5000/products-and-suppliers')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products and Suppliers</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Product Name:</strong> {item.Name}, <strong>Supplier:</strong> {item.SupplierName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSupplierList;



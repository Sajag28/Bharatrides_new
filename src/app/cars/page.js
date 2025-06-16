'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/used-cars/cars-by-user/Sajag')
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Available Cars</h2>
      {cars.length === 0 ? (
        <p>No cars uploaded yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {cars.map((car) => (
            <div key={car.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <h3>{car.title}</h3>
              <p>{car.description}</p>
              <p><strong>Price:</strong> ₹{car.price}</p>
              {car.images && car.images.length > 0 && (
                <>
                {console.log(car.images)}
                <img src={`${car.images[0].image}`} alt={car.title} width="300" />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

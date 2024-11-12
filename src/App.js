import './App.css';
import React, { useState, useEffect } from 'react';

const CarsList = () => {
  // Állapot a lekért adatok tárolására
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kérés az autók adatainak lekérésére
  useEffect(() => {
    // Az API végpont
    const fetchCars = async () => {
      try {
        // Kérés az autók listájának lekérésére
        const response = await fetch('https://cars.sulla.hu/cars');
        if (!response.ok) {
          throw new Error('Hiba történt a kérés feldolgozásakor');
        }

        // A válasz JSON-ra alakítása
        const data = await response.json();

        // Autók beállítása az állapotba
        setCars(data);
      } catch (err) {
        // Hibakezelés
        setError(err.message);
      } finally {
        // Betöltési állapot befejezése
        setLoading(false);
      }
    };

    fetchCars();
  }, []); // Csak egyszer fut le, amikor a komponens betöltődik

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (error) {
    return <div>Hiba történt: {error}</div>;
  }

  return (
    <div className='feketehatter'>
      <h1>Autók listája</h1>
      <table>
        <thead>
          <tr>
            <th className='szelesseg'>Név</th>
            <th className='szelesseg'>Szín</th>
            <th>Kép</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.car_name}</td>
              <td>{car.car_color}</td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${car.car_picture}`}
                  alt={car.car_name}
                  title={car.car_name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsList;

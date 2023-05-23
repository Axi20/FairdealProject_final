import { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/AdminPage/admin_page_users.scss';
import '../scss/AdminPage/admin_car_page.scss';



function AdminCarPage() {
    const [cars, setCars] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editCar, setEditCar] = useState({});

    useEffect(() => {
        const cars = async () => {
            try {
                const [carsResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8080/cars/car').then(response => response.data)
                ]);

                setCars(carsResponse);
            } catch (error) {
                console.error(error);
            }
        };

        cars();
    }, []);

    const handleEdit = car => {
        setEditId(car.car_id);
        setEditCar(car);
    };

    const handleCarChange = e => {
        setEditCar({...editCar, [e.target.name]: e.target.value });
    };

    const updateCar = async () => {
        try {
            await axios.put(`http://127.0.0.1:8080/cars/${editId}`, editCar);
            setEditId(null);
            setEditCar({});
            // Refresh user list to show the updated data
            const [carsResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8080/cars/car').then(response => {
                    console.log(response.data); 
                    return response.data;
                })
                
            ]);
            setCars(carsResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCar = async (carId) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/cars/${carId}`);
            const [carsResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8080/cars/car').then(response => response.data)
            ]);
            setCars(carsResponse);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section>
            <div className="container">
                <div className="users-modal">
                    <div className='users-modal-information'>
                        <h2 className='users-modal-information__title'>Regisztrált autók</h2>
                        <hr className='users-modal-information__line'></hr>
                        <table className='table table-light table-hover'>
                        <thead className='table-dark'>
                                <tr>
                                <th>Autó ID</th>
                                <th>Márka</th>
                                <th>Modell</th>
                                <th>Típus</th>
                                <th>Év</th>
                                <th>LE</th>
                                <th>Üzemanyag</th>
                                <th>Motor</th>
                                <th>Váltó</th>
                                <th>Rendszám</th>
                                <th>Fogyasztás</th>
                                <th>Ár</th>
                                <th>Bérelt</th>
                                <th>Műveletek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map(car => (
                                    <tr key={car.car_id}>
                                         <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='brand' className='edit' value={editCar.car_id} readOnly />
                                                : car.car_id}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='brand' className='edit' value={editCar.brand} onChange={handleCarChange} />
                                                : car.brand}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='modell' className='edit' value={editCar.model} onChange={handleCarChange} />
                                                : car.model}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='type' className='edit' value={editCar.type} onChange={handleCarChange} />
                                                : car.type}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='year' className='edit' value={editCar.year} onChange={handleCarChange} />
                                                : car.year}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='horsepower' className='edit' value={editCar.horsepower} onChange={handleCarChange} />
                                                : car.horsepower}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='fuel' className='edit' value={editCar.fuel} onChange={handleCarChange} />
                                                : car.fuel}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='engine_size' className='edit' value={editCar.engine_size} onChange={handleCarChange} />
                                                : car.engine_size}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='shift_type' className='edit' value={editCar.shift_type} onChange={handleCarChange} />
                                                : car.shift_type}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='plate_number' className='edit' value={editCar.plate_number} onChange={handleCarChange} />
                                                : car.plate_number}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='consumption' className='edit' value={editCar.consumption} onChange={handleCarChange} />
                                                : car.consumption}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='price' className='edit' value={editCar.price} onChange={handleCarChange} />
                                                : car.price}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <input type='text' name='rented' className='edit' value={editCar.rented} onChange={handleCarChange} />
                                                : car.rented}
                                        </td>
                                        <td>
                                            {editId === car.car_id ? 
                                                <button onClick={updateCar}>Mentés</button>
                                                : <button onClick={() => handleEdit(car)}>Szerkesztés</button>}
                                           <button onClick={() => deleteCar(car.car_id)}>Törlés</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminCarPage;
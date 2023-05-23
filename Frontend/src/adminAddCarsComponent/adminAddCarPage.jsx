import { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/AdminPage/admin_page_users.scss';


function AdminAddCarPage() {
    const [newCar, setNewCar] = useState({
        vin: '',
        brand: '',
        model: '',
        type: '',
        year: '',
        horsepower: '',
        fuel: '',
        engine_size: '',
        shift_type: '',
        plate_number: '',
        consumption: '',
        price: '',
        rented: '',
        description: '',
        img: '',
    });

    const handleInputChange = (e) => {
        setNewCar({
            ...newCar,
            [e.target.name]: e.target.value
        });
    };

    const handleAddCar = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8080/cars', newCar);

            console.log(response.data);
            setNewCar({
                vin: '',
                brand: '',
                model: '',
                type: '',
                year: '',
                horsepower: '',
                fuel: '',
                engine_size: '',
                shift_type: '',
                plate_number: '',
                consumption: '',
                price: '',
                rented: '',
                description: '',
                img: '',

            });
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <section>
            <div className="container">
                <div className="users-modal">
                    <div className='users-modal-information'>
                        <h2 className='users-modal-information__title'>Bérlések</h2>
                        <hr className='users-modal-information__line'></hr>
                        <table className='table table-light table-hover'>
                            <thead className='table-dark'>
                                    <tr>
                                        <th>VIN</th>
                                        <th>Márka</th>
                                        <th>Modell</th>
                                        <th>Típus</th>
                                        <th>Év</th>
                                        <th>LE</th>
                                    </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type='text' name='vin' value={newCar.vin} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='brand' value={newCar.brand} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='model' value={newCar.model} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='type' value={newCar.type} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='year' value={newCar.year} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='horsepower' value={newCar.horsepower} onChange={handleInputChange} />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className='table table-light table-hover'>
                            <thead className='table-dark'>
                                    <tr>
                                        <th>Üzemanyag</th>
                                        <th>Motor</th>
                                        <th>Váltó</th>
                                        <th>Rendszám</th>
                                        <th>Fogyasztás</th>
                                        <th>Ár</th>
                                    </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type='text' name='fuel' value={newCar.fuel} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='engine_size' value={newCar.engine_size} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='shift_type' value={newCar.shift_type} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='plate_number' value={newCar.plate_number} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='consumption' value={newCar.consumption} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='price' value={newCar.price} onChange={handleInputChange} />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className='table table-light table-hover'>
                            <thead className='table-dark'>
                                    <tr>
                                        <th>Bérelt</th>
                                        <th>Leírás</th>
                                        <th>Kép</th>
                                        <th>Műveletek</th>
                                    </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type='text' name='rented' value={newCar.rented} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='description' value={newCar.description} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type='text' name='img' value={newCar.img} onChange={handleInputChange} />
                                </td>
                                <td>
                                    <button onClick={handleAddCar}>Hozzáadás</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminAddCarPage;
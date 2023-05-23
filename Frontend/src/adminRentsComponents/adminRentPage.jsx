import { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/AdminPage/admin_page_users.scss';


function AdminRentPage() {
    const [rents, setRents] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editRent, setEditRent] = useState({});

    useEffect(() => {
        const cars = async () => {
            try {
                const [rentResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8080/rent').then(response => response.data)
                ]);

                setRents(rentResponse);
            } catch (error) {
                console.error(error);
            }
        };

        cars();
    }, []);

    const handleEdit = rent => {
        setEditId(rent.rent_id);
        setEditRent(rent);
    };

    const handleEditChange = e => {
        if(e.target.name === 'rent_date') {
            let originalDate = new Date(e.target.value);
            let mysqlFormattedDate = originalDate.toISOString().slice(0, 19).replace('T', ' ');
            setEditRent({...editRent, [e.target.name]: mysqlFormattedDate });
        } else {
            setEditRent({...editRent, [e.target.name]: e.target.value });
        }
    };

    const updateRent = async () => {
        try {
            await axios.put(`http://127.0.0.1:8080/rent/${editId}`, editRent);
            setEditId(null);
            setEditRent({});
            // Refresh user list to show the updated data
            const [rentResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8080/rent').then(response => {
                    console.log(response.data); 
                    return response.data;
                })
                
            ]);
            setRents(rentResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRent = async (rentId) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/rent/${rentId}`);
            const [rentResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8080/rent').then(response => response.data)
            ]);
            setRents(rentResponse);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section>
            <div className="container">
                <div className="users-modal">
                    <div className='users-modal-information'>
                        <h2 className='users-modal-information__title'>Bérlések</h2>
                        <hr className='users-modal-information__line'></hr>
                        <table className='table table-light table-hover'>
                        <thead className='table-dark'>
                                <tr>
                                <th>Ügyfél ID</th>
                                <th>Autó ID</th>
                                <th>Bérlés dátuma</th>
                                <th>Napok száma</th>
                                <th>Ár</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rents.map(rent => (
                                    <tr key={rent.rent_id}>
                                        <td>
                                            {editId === rent.rent_id ? 
                                                <input type='text' name='customer_id' className='edit' value={editRent.customer_id} onChange={handleEditChange} />
                                                : rent.customer_id}
                                        </td>
                                        <td>
                                            {editId === rent.rent_id ? 
                                                <input type='text' name='car_id' className='edit' value={editRent.car_id} onChange={handleEditChange} />
                                                : rent.car_id}
                                        </td>
                                        <td>
                                            {editId === rent.rent_id ? 
                                                <input type='text' name='rent_date' className='edit' value={editRent.rent_date} onChange={handleEditChange} />
                                                : rent.rent_date}
                                        </td>
                                        <td>
                                            {editId === rent.rent_id ? 
                                                <input type='text' name='rent_days' className='edit' value={editRent.rent_days} onChange={handleEditChange} />
                                                : rent.rent_days}
                                        </td>
                                        <td>
                                            {editId === rent.rent_id ? 
                                                <input type='text' name='rent_price' className='edit' value={editRent.rent_price} onChange={handleEditChange} />
                                                : rent.rent_price}
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

export default AdminRentPage;
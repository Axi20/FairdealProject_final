import { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/AdminPage/admin_page_users.scss';

            
function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editUser, setEditUser] = useState({});

    useEffect(() => {
        const customers = async () => {
            try {
                const [customersResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8080/customers').then(response => response.data)
                ]);

                setUsers(customersResponse);
            } catch (error) {
                console.error(error);
            }
        };

        customers();
    }, []);

    const handleEdit = user => {
        setEditId(user.customer_id);
        setEditUser(user);
    };

    const handleUserChange = e => {
        setEditUser({...editUser, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {
            await axios.put(`http://127.0.0.1:8080/customers/${editId}`, editUser);
            setEditId(null);
            setEditUser({});
            // Refresh user list to show the updated data
            const [customersResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8080/customers').then(response => response.data)
            ]);
            setUsers(customersResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (customerId) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/customers/${customerId}`);
            const [customersResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8080/customers').then(response => response.data)
            ]);
            setUsers(customersResponse);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <div className = "container">
                <div className="users-modal">
                    <div className='users-modal-information'>
                        <h2 className='users-modal-information__title'>Regisztrált felhasználók</h2>
                        <hr className='users-modal-information__line'></hr>
                        <table className='table table-light table-hover'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Ügyfél ID</th>
                                    <th>Vezetéknév</th>
                                    <th>Keresztnév</th>
                                    <th>Email</th>
                                    <th>Telefonszám</th>
                                    <th>Jogosítványszám</th>
                                    <th>Műveletek</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                    <tr key={user.customer_id}>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <input type='text' name='customer_id' className='edit' value={editUser.customer_id} onChange={handleUserChange} />
                                                : user.customer_id}
                                        </td>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <input type='text' name='firstname' className='edit' value={editUser.firstname} onChange={handleUserChange} />
                                                : user.firstname}
                                        </td>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <input type='text' name='lastname' className='edit' value={editUser.lastname} onChange={handleUserChange} />
                                                : user.lastname}
                                        </td>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <input type='text' name='email' className='edit' value={editUser.email} onChange={handleUserChange} />
                                                : user.email}
                                        </td>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <input type='text' name='phone_number' className='edit' value={editUser.phone_number} onChange={handleUserChange} />
                                                : user.phone_number}
                                        </td>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <input type='text' name='driving_licence' className='edit' value={editUser.driving_licence} onChange={handleUserChange} />
                                                : user.driving_licence}
                                        </td>
                                        <td>
                                            {editId === user.customer_id ? 
                                                <button onClick={updateUser}>Mentés</button>
                                                : <button onClick={() => handleEdit(user)}>Szerkesztés</button>}
                                           <button onClick={() => deleteUser(user.customer_id)}>Törlés</button>
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

export default AdminUserPage;
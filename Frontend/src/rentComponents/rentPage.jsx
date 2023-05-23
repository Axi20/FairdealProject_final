import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Form } from "react-bootstrap";
import axios from 'axios';
import '../scss/RentPage/rent_page.scss';

const disableRefresh = () => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
  
    useEffect(() => {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  };
  
function RentPage() {
    disableRefresh();
    const count = useSelector((state) => state.userData.carData)
    const [rentedDays, setRentedDays] = useState(1)
    const id = count.car_id;
    const customer_id = localStorage.getItem("ID");
    const handleRentedDaysChange = (event) => {setRentedDays(event.target.value);};
    const getTotalPrice = () => {return rentedDays * count.price;};
    const price = rentedDays * count.price;

    const rentCar = () => {
        const formData = {
            carData: count,
            userName: document.getElementById("formUserName").value,
            userPhoneNumber: document.getElementById("formUserPhoneNumber").value,
            userEmail: document.getElementById("formUserEmail").value,
            userLicenceNumber: document.getElementById("formUserLicenceNumber").value,
            rentedDays: document.getElementById("formRentDays").value,
        };

        const jsonData = JSON.stringify(formData);

        axios.put(`http://127.0.0.1:8080/cars/${id}`, {
            rented: true
        },
            {headers: {'Content-Type': 'application/json'}})
            .then(response => {console.log(response.data);})
            .catch(error => {console.error(error);});

        //Add a new rental to the database
        axios.post('http://127.0.0.1:8080/rents', {
            customer_id: parseInt(customer_id),
            car_id: parseInt(id),
            rent_days: parseInt(rentedDays),
            rent_price: parseInt(price)
        },
            {headers: {'Content-Type': 'application/json'}})
            .then(response => {console.log(response.data);})
            .catch(error => {console.error(error);});

           
        //Send the email using the server-side sendConfirmationEmail function
        //Get the current date as the rental start date
        const rentalStartDate = new Date().toISOString().slice(0, 10); 
        const rentalDays = parseInt(formData.rentedDays);
        //Calculate the end rental date based on the rental start date and rental days
        const rentalEndDate = new Date(Date.parse(rentalStartDate) + (rentalDays * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10); 
        
        const sendConfirmationEmail = (email, name, carName, carPlateNumber, carModel, carYear, rentalStart, rentalEnd, finalPrice, office, phoneNumber, contactEmail) => {
            axios.post('http://127.0.0.1:8080/send-confirmation-email', {
            email,
            name,
            carName,
            carPlateNumber,
            carModel,
            carYear,
            rentalStart,
            rentalEnd,
            finalPrice,
            office,
            phoneNumber,
            contactEmail
            },
            {headers: {'Content-Type': 'application/json'}})
            .then(response => {console.log(response.data);})
            .catch(error => {console.error(error);});
        };

    //Call the sendConfirmationEmail function with the required parameters
    sendConfirmationEmail(formData.userEmail, formData.userName, count.brand, count.plate_number, count.model, count.year, rentalStartDate, rentalEndDate, price);
    alert("Sikeres bérlés! A megadott email címre visszaigazoló emailt küldtünk!");
    window.location.href = '/';
}
    return (
        <section>
            <div className='rent-form'>
                <h1 className='rentform-title'>Bérlés véglegesítése</h1>
                <hr></hr>
                <div className="row">
                    <div className="col">
                        <Form.Group controlId="formCarName">
                            <Form.Label>Márka</Form.Label>
                            <Form.Control type="text" value={count.brand} disabled />
                        </Form.Group>
                        <Form.Group controlId="formCarModel">
                            <Form.Label>Modell</Form.Label>
                            <Form.Control type="text" value={count.model}  disabled />
                        </Form.Group>
                        <Form.Group controlId="formCarModel">
                            <Form.Label>Évjárat</Form.Label>
                            <Form.Control type="text" value={count.year} disabled />
                        </Form.Group>
                        <Form.Group controlId="formCarModel">
                            <Form.Label>Napi ár</Form.Label>
                            <Form.Control type="text" value={count.price} disabled />
                        </Form.Group>
                        <Form.Group controlId="formCarModel">
                            <Form.Label>Végösszeg</Form.Label>
                            <Form.Control type="text" value={`${getTotalPrice()} HUF`} disabled />
                        </Form.Group>
                    </div>

                    <div className="col">
                        <Form.Group controlId="formUserName">
                            <Form.Label>Teljes név</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <Form.Group controlId="formUserPhoneNumber">
                            <Form.Label>Telefonszám</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email cím</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <Form.Group controlId="formUserLicenceNumber">
                            <Form.Label>Jogosítvány szám</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <Form.Group controlId="formRentDays">
                            <Form.Label>Bérelt napok száma</Form.Label>
                            <Form.Control type="number" value={rentedDays} onChange={handleRentedDaysChange} required min={1} max={30} />
                        </Form.Group>
                    </div>
                </div>
                <button type="submit" onClick={rentCar} className='rent-final-button'>Bérlés</button>
            </div>
        </section>
    )
}

export default RentPage;
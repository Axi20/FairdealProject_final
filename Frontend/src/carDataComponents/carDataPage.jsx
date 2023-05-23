import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';
import { TileLayer } from 'react-leaflet/TileLayer'
import { MapContainer } from 'react-leaflet/MapContainer'
import { divIcon } from 'leaflet';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { addData } from '../redux/userData.js';
import FooterComponent from '../footerComponents/footerComponent';
import '../scss/CarDataPage/car_data_page.scss';
import '../scss/CarDataPage/car_data_page_map.scss';
import '../scss/CarDataPage/car_data_page_office.scss';
import '../scss/CarDataPage/car_data_page_conditions.scss';


function CarDataPage(props) {
    const count = useSelector((state) => state.userData.carData)
    const dispatch = useDispatch()
        const { id } = useParams();
        const [car, setCar] = useState({});
        const [rentplace, setRentplace] = useState({});
        const navigate = useNavigate();

        const handleClick = () => {
            //Get the token from local storage
            const token = localStorage.getItem("jwt");
            if (!token) {
            //No token is present, the user is not logged in
            window.location.href = '/login';
            } else {
            //Token is present, the user is logged in
            navigate(`/rent-car/${id}`);
            //Parse the token to get the user's ID or other information
            const payload = jwtDecode(token)
            }
        };

        const mapMarker = divIcon({
            className: 'my-div-icon',
            html: '<i></i>',
            iconUrl:"../assets/location.png",
            iconSize: [30, 30],
        });
      
        useEffect(() => {
            async function fetchData() {
              try {
                const [carResponse, rentplaceResponse] = await Promise.all([
                  axios.get(`http://127.0.0.1:8080/cars/${id}`).then(response => response.data),
                  axios.get(`http://127.0.0.1:8080/rentplace/1`).then(response => response.data),
                ]);
          
                setCar(carResponse);
                setRentplace(rentplaceResponse);
                dispatch(addData(carResponse, id));
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
            fetchData();
          }, [id, dispatch]);

    return (
        <>
            <div className="car-data">
                <div className='car-data__bcg  '>
                    <div className='car-data-internal-div'>
                        <div className='car-data-internal-div__list-'>
                            <h1 className='car-data-internal-div__title'>Autó adatai</h1>       
                            <hr className='car-data-internal-div__line'></hr>  
                            <h3>{car.brand} {car.model} {car.year}</h3> 
                            <h4 className='mb-3'>{car.type}</h4>
                            <p><li>{car.fuel}</li></p>
                            <p><li>{car.consumption} l/km</li></p>    
                            <p><li>{car.shift_type} váltó</li></p> 
                            <p><li>{car.engine_size} cm<sup>3</sup> {car.horsepower} LE</li></p>
                            <p className='car-data-internal-div__description'>{car.description}</p>
                            <p className='car-data-internal-div__price'>Napi ár: {car.price} FT</p>
                            <button type="submit" onClick={handleClick}  className='car-data-internal-div__rent-button'>Bérlés</button>
                        </div>
                        <div>
                            <img className='car-data-internal-div__img' src={car.img}></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className='terms-data'>
                <h1 className='terms-data__title'>Bérlési feltételek</h1>  
                <div className='terms-data__description'>
                        <p><li>A szolgáltatás igénybevételével Ön elfogadja az általános szerződési feltételeket továbbiakban <a href="/terms" className='text-blue-800 underline'>ÁSZF</a>.</li></p>
                        <p><li>Szolgáltatásaink igénybevételére 18. életévüket betöltött, adott gépjárműtípusra szóló, érvényes jogosítvánnyal rendelkező személyek jogosultak.</li></p>
                        <p><li>Hosszútávú bérlés esetén a fizetés történhet egyösszegben, vagy részletenként, azonban 50% előleg befizetése mindenképp szükséges!</li></p>
                    <p><li>A szolgáltatást igénybevevő személy (a sofőr kilététől függetlenül) vállalja, hogy a bérelt gépjárműben önhibájából okozott károkat megtéríti.</li></p>
                </div>
            </div>
                
            <div className='rentplace-map'>
                <h1 className='rentplace-map__title'>Kölcsönző helye</h1> 
                <hr></hr>      
                <div className='osm-div' id='osm'>
                    <MapContainer className="map-container" center={[46.2546312, 20.1486016]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={[46.2760757, 20.0985408]} icon={mapMarker}>
                            <Popup>Szeged Budapesti Út 5.</Popup>
                        </Marker>
                    </MapContainer>
                </div>    
            </div>
              
            <div className='rentplace-data'>
                <div className='rentplace-data-internal'>
                    <h1 className='rentplace-data-internal__title'>Irodánk</h1>       
                    <hr className='car-data-internal-div__line'></hr>  
                    <p className='rent-place-data-h1'>{rentplace.zip} {rentplace.city} {rentplace.street} {rentplace.street_number}.</p>
                    <p className='rent-place-data-h1'>{rentplace.phone_number}</p> 
                    <p className='rent-place-data-h1'>{rentplace.email}</p> 
                    <p className='rent-place-description'>Bármilyen kérdéssel, kéréssel nyugodtan forduljon hozzánk bizalommal, személyesen az irodánkban, vagy a megadott elérhetőségeink egyikén.</p>
                </div>
            </div>
            <FooterComponent/>
        </>
    )
}

export default CarDataPage;
import { useState, useEffect } from 'react';
import Typed from 'react-typed';
import axios from 'axios';
import Footer from '../footerComponents/footerComponent';
import '../scss/HomePage/home_page_effect.scss';
import '../scss/HomePage/home_page_signup_cta.scss';
import '../scss/HomePage/home_page_offers.scss';


function HomePage() {
    const [car1, setCar1] = useState({});
    const [car2, setCar2] = useState({});
    const [car3, setCar3] = useState({});
  
    useEffect(() => {
        axios.get('http://127.0.0.1:8080/cars/4')
          .then(response => {
            const data = response.data;
            setCar1(data);
          })
          .catch(error => console.error(error.message));
      
        axios.get('http://127.0.0.1:8080/cars/6')
          .then(response => {
            const data = response.data;
            setCar2(data);
          })
          .catch(error => console.error(error.message));
      
        axios.get('http://127.0.0.1:8080/cars/2')
          .then(response => {
            const data = response.data;
            setCar3(data);
          })
          .catch(error => console.error(error.message));
      }, []);

    return (
       <div className='Main'>
        <section className='LandingPage'>
            <div className='hero-section'>
                <div className='hero-section-external-div'>
                    <h1 className='hero-section-external-div__title'>Megfizethető árak és garantált minőség</h1>
                    <div className='hero-section-internal-div'>
                        <p className='hero-section-internal-div__choice'>Nagy választék: </p>
                        <Typed
                            className='hero-section-internal-div__type'
                            strings={['Volvo', 'Volkswagen', 'Suzuki', 'Mercedes', 'Ford', 'Honda', 'Nissan', 'Mazda', 'Hyundai']} typeSpeed={120} backSpeed={140} loop />
                    </div>
                    <p className='hero-section-internal-div__last-line'>Bármikor rendelkezésre állnak segítőkész, <br></br> képzett kollégáink</p>
                    <a href="/about" className='hero-section-internal-div__link'><button className='hero-section-internal-div__button'>Tudj meg többet</button></a>
                </div>
            </div>
        </section>
        <section className='SignupCta'>
            <div className="row">
                <div className="col">
                    <div className='signup-external-div'>
                        <div className='signup-internal-div'>
                            <div className='signup-internal-div__text'>
                                <h1 className='signup-internal-div__signup'>Regisztráljon még ma!</h1>
                                Hogy könnyen és gyorsan élvezni tudja az általunk kínált szolgáltatásokat.
                                Elege van a hosszan tartó ügyintézésből és a vele járó papírmunkából? Weboldalunk használatával mostantól csak egy kattintás az autó bérlés!
                                Az otthon kényelméből tudja böngészni elérhető autóinkat, amit akár házhoz is viszünk a háztól-házig szolgáltatásunk keretén belül. <br></br>     
                                <a className='signup-internal-div__link' href="/registration"><button className='signup-internal-div__cta-button'>Regisztráció</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='Offers'>
            <div className='special-offers'>
                <div className='special-offers__title'>Kiemelt ajánlataink</div>
                <hr className='special-offers__hr'></hr>
                <div className='special-offers-cars'>
                    <div className='row'>
                        <div className='col'>
                            <div className='special-offers-cars-internal-div'>
                                <p className='hidden'>{car1.id}</p>
                                <div className='main-image'><img className='special-offers-cars-internal-div__image' src={car1.img} alt="/" /></div>
                                <div className='car-informations'>
                                    <h2 className='car-informations__car-brand'>{car1.brand}</h2>
                                    <p className='car-informations__car-price'>{car1.price} Ft/nap</p>
                                    <div className='special-offers-cars-data-div'>
                                        <p className='special-offers-cars-data-div__car-data'>{car1.engine_size} cm<sup>3</sup></p>
                                        <p className='special-offers-cars-data-div__car-data'>{car1.consumption} l/100km </p>
                                        <p className='special-offers-cars-data-div__car-data'>{car1.fuel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='special-offers-cars-internal-div'>
                                <p className='hidden'>{car2.id}</p>
                                <div className='main-image'><img className='special-offers-cars-internal-div__image' src={car2.img} alt="/" /></div>
                                <div className='car-informations'>
                                    <h2 className='car-informations__car-brand'>{car2.brand}</h2>
                                    <p className='car-informations__car-price'>{car2.price} Ft/nap</p>
                                    <div className='special-offers-cars-data-div'>
                                        <p className='special-offers-cars-data-div__car-data'>{car2.engine_size} cm<sup>3</sup></p>
                                        <p className='special-offers-cars-data-div__car-data'>{car2.consumption} l/100km </p>
                                        <p className='special-offers-cars-data-div__car-data'>{car2.fuel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='special-offers-cars-internal-div'>
                                <p className='hidden'>{car3.id}</p>
                                <div className='main-image'><img className='special-offers-cars-internal-div__image' src={car3.img} alt="/" /></div>
                                <div className='car-informations'>
                                    <h2 className='car-informations__car-brand'>{car3.brand}</h2>
                                    <p className='car-informations__car-price'>{car3.price} Ft/nap</p>
                                    <div className='special-offers-cars-data-div'>
                                        <p className='special-offers-cars-data-div__car-data'>{car3.engine_size} cm<sup>3</sup></p>
                                        <p className='special-offers-cars-data-div__car-data'>{car3.consumption} l/100km </p>
                                        <p className='special-offers-cars-data-div__car-data'>{car3.fuel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       
                <div className='go-to-cars-page'>
                    <h2 className="go-to-cars-page__title">Nézze meg a kínálatunkat!</h2>
                    <hr className='go-to-cars-page__hr'></hr>
                    <div>
                        <a href="/cars"><button className='go-to-cars-page__button'>Bérelhető autóink</button></a>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
       </div>
    );
}

export default HomePage;
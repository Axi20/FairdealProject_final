import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import '../scss/ContactPage/contact_page.scss';


function ContactPage() {
    const [open, setOpen] = useState({});
    const [rentplace, setRentplace] = useState({});

    const fetchRentplaceAndOpen = async () => {
      try {
        const [rentplaceResponse, openResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8080/rentplace/1').then(response => response.data),
          axios.get('http://127.0.0.1:8080/open/1').then(response => response.data)
        ]);
    
        setRentplace(rentplaceResponse);
        setOpen(openResponse);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(() => {
      fetchRentplaceAndOpen();
    }, []);

    return (
        <section className='contact'>
            <div className = "container">
                <div className="contact-modal">
                    <div className='contact-modal-informations'>
                        <h1 className='contact-modal-title'>Kérdése van? <br></br> Lépjen velünk kapcsolatba!</h1>
                        <hr></hr>
                        <div>
                            <div className="row"><div className="col mobile"><FontAwesomeIcon icon={faMobileAlt} size="2x" /></div>
                            <div className="col"><h5 className='info'>{rentplace.phone_number}</h5></div></div>
                        </div>
                        <div>
                            <div className="row"><div className="col map"><FontAwesomeIcon icon={faMapMarkerAlt} size="2x" /></div>
                            <div className="col"><h5 className='info'>{rentplace.zip} {rentplace.city} {rentplace.street} {rentplace.street_number}</h5></div></div>
                        </div>
                        <div>
                            <div className="row"><div className="col email"><FontAwesomeIcon icon={faEnvelope} size="2x" /></div>
                            <div className="col"><h5 className='info'>{rentplace.email}</h5></div></div>
                        </div>
                        <h3 className='open'>Nyitvatartási idő</h3>
                        <hr></hr>
                        <div><div className="row"><div className="col"><h5>Hétfő</h5></div><div className="col"><h5>{open.monday}</h5></div></div></div>
                        <div><div className="row"><div className="col"><h5>Kedd</h5></div><div className="col"><h5>{open.tuesday}</h5></div></div></div>
                        <div><div className="row"><div className="col"><h5>Szerda</h5></div><div className="col"><h5>{open.wednesday}</h5></div></div></div>
                        <div><div className="row"><div className="col"><h5>Csütörtök</h5></div><div className="col"><h5>{open.thursday}</h5></div></div></div>
                        <div><div className="row"><div className="col"><h5>Péntek</h5></div><div className="col"><h5>{open.friday}</h5></div></div></div>
                        <div><div className="row"><div className="col"><h5>Szombat</h5></div><div className="col"><h5>{open.saturday}</h5></div></div></div>
                        <div><div className="row"><div className="col"><h5>Vasárnap</h5></div><div className="col"><h5>{open.sunday}</h5></div></div></div>
                    </div>
                </div>
            </div>    
        </section>
    );
}

export default ContactPage;


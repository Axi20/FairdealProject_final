import '../scss/CarPage/car_page.scss';


function CarCard(props) {
    return(
        <>
            <div className="card mb-3">
                <img className="image-rent" src={props.img} alt="cars" />
                <div className="card-body">
                    <h5 className="card-title">{props.brand} {props.model}</h5>
                    <p className="card-text">{props.description}</p>
                    <button type='submit' onClick={() => window.location.assign(`/cars/${props.id}`)} className='rent-btn-rent'>Adatlap</button>
                </div>
            </div>
        </>
    )
}

export default CarCard;
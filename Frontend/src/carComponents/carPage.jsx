import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import CarCard from './carCard';
import '../scss/CarPage/car_page.scss';


function CarPage() {
    const [models, setModels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modelsPerPage,] = useState(4);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFacets, setSelectedFacets] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://127.0.0.1:8080/cars');
            const data = response.data;
            setModels(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);

    //Facet checkboxes
    const facets = ["Ferdehátú", "Pickup", "SUV", "Szedán", "Kombi", "Kabrió"];

    const handleFacetChange = (event) => {
        const facet = event.target.name;
        setSelectedFacets(prevSelectedFacets => {
          if (prevSelectedFacets.includes(facet)) {
            return prevSelectedFacets.filter(f => f !== facet);
          } else {
            return [...prevSelectedFacets, facet];
          }
        });
      };

    //Get current models
    const indexOfLastModel = currentPage * modelsPerPage;
    const indexOfFirstModel = indexOfLastModel - modelsPerPage;
    const filteredModels = models.filter(model =>
        (model.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          model.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedFacets.length === 0 || selectedFacets.includes(model.type))
      );
    const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //Calculate total number of pages
    const totalPageNum = Math.ceil(filteredModels.length / modelsPerPage);

    return (
        <>
            <input type="text" className='search' placeholder="Keresés..." onChange={(event) => setSearchTerm(event.target.value)} />

            <div className='facet-container'>
                <p className='facet-container__title'>Keresés típus szerint</p>
                {facets.map(facet => (
                    <label key={facet}>
                        <input type="checkbox" name={facet} onChange={handleFacetChange} />
                        {facet}
                    </label>
                ))}
            </div>

            <div className='car-card-container'>
                {currentModels.map((model) => (
                    <CarCard key={model.vin} id={model.car_id} img={model.img} brand={model.brand} model={model.model} type={model.type}
                        year={model.year} consumption={model.consumption} price={model.price} description={model.description} engine_size={model.engine_size} /> 
                ))}
            </div>
            <hr className='page-line'></hr>
            <Pagination>
                <Pagination.Prev disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} />
                {[...Array(totalPageNum).keys()].map(number => (
                    <Pagination.Item key={number+1} active={number+1 === currentPage} onClick={() => paginate(number+1)}>
                        {number+1}
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage === totalPageNum} onClick={() => paginate(currentPage + 1)} />
            </Pagination>
        </>
    )
}

export default CarPage;

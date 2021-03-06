import React, { useContext } from 'react';
import './Service.css';
import { Zoom } from 'react-reveal'
import { useHistory } from 'react-router';
import { historyContext } from '../../../App';
const Service = (props) => {
    const [currComp, setCurrComp] = useContext(historyContext);
    const history = useHistory();
    const service = props?.service;
    const handleBooking = () => {
        history.push({
            pathname: '/dashboard/book',
            state: { service: service }
        })
        setCurrComp('/dashboard/book');
    }
    return (
        <Zoom fraction={0.5}>
            <div className="service">
                <div style={{
                    background: `url(${service.image})`, backgroundSize: "cover",
                    backgroundPosition: "center"
                }} className="service-inner">
                    <div className="service-title">
                        {service.name}
                    </div>
                    <div className="price">
                        <span>${service.price}</span>
                    </div>
                    <div onClick={handleBooking} className="book-btn">
                        Book
                    </div>
                </div>
            </div >
        </Zoom >
    );
};

export default Service;
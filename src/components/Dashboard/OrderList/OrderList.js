import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { historyContext, userContext } from '../../../App';
import loading from '../../../Images/loading.svg';
import Buttonmat from '../../Buttonmat';
import { handleGoogleSignIn } from '../../Login/LoginManager';
import './OrderList.css';

const OrderList = () => {
    const [onGoing, setOnGoing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [selectedBook, setSelectedBook] = useState({})
    const history = useHistory();
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [currComp, setCurrComp] = useContext(historyContext);
    const goToServices = () => {
        history.push('/home');
        setCurrComp('/home');
    }
    useEffect(() => {
        setOnGoing(true);
        fetch('https://aaron-stanley.herokuapp.com/bookinglist?email=admin', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setOnGoing(false);
                setBookings(data);
            })
    }, [loggedInUser.email]);
    const handleSelect = (book, status) => {
        setSelectedStatus(status);
        const updatedBook = { ...book };
        updatedBook.status = status;
        // to be continued :(
    }
    return (
        <div className="bookinglist-container page-trans">
            {
                onGoing && <div className="loading"><img src={loading} alt="loading" /></div>
            }
            {

                bookings?.length > 0 ?
                    <table className="tableData">
                        <thead>
                            <tr>
                                <th>Customer Email</th>
                                <th>Service Name</th>
                                <th>Booking Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map(book =>
                                    <tr>
                                        <td>{book.email}</td>
                                        <td>{book.serviceTitle}</td>
                                        <td>{new Date(book.date).toDateString('DD/MM/YYYY')}</td>
                                        <td className="status-option">
                                            <div className="status-grp">
                                                <div className="statuses">
                                                    <div onClick={() => handleSelect(book, 'pending')} className={`status status-pending ${book.status === 'pending' ? "status-active" : ""}`}> Pending</div>
                                                    <div onClick={() => handleSelect(book, 'ongoing')} className={`status status-ongoing ${book.status === 'ongoing' ? "status-active" : ""}`}>Ongoing</div>
                                                    <div onClick={() => handleSelect(book, 'done')} className={`status status-done${book.status === 'done' ? "status-active" : ""}`}>Done</div>
                                                </div>
                                                <div className="button-container" onClick={handleSelect}>
                                                    <Buttonmat text={`Change to ${selectedStatus}`}></Buttonmat>
                                                </div>
                                            </div>


                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    :
                    <div> There is no Orders yet</div>

            }
        </div>
    );
};

export default OrderList;
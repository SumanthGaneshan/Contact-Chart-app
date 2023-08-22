import React, { FC, useState } from 'react';
import './ContactDetail.css';


interface detailModel {
    firstName: string,
    lastName: string,
    status: string
    onClose: () => void;
}

const ContactDetail: FC<detailModel> = (props) => {
    const { firstName, lastName, status } = props;

    const [show, setShow] = useState(true);

    return (
        <div className="popup-container">
            <div className="pop-wrapper">
                <div className="popup">
                    <h2>Contact Details</h2>
                    <p>First Name: {firstName}</p>
                    <p>Last Name: {lastName}</p>
                    <p>Status: {status}</p>
                    <button className="close-button" onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;

import React, { FC, useState } from 'react';
import './NewContact.css'
import store from '../../reduxModel/store';
import { useNavigate, useLocation } from 'react-router-dom';

const NewContact: FC = ({ }) => {

    let { state } = useLocation();


    const [firstName, setFirstName] = useState(state?.firstName || '');
    const [lastName, setLastName] = useState(state?.lastName || '');
    const [status, setStatus] = useState(state?.status || 'active');
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        // checking if state exists to edit or create
        if (state) {
            await store.dispatch({
                type: 'contactEdited',
                payload: {
                    firstName: firstName,
                    lastName: lastName,
                    status: status,
                    id: state.id,
                }
            })
        }
        else {
            await store.dispatch({
                type: 'newContact',
                payload: {
                    firstName: firstName,
                    lastName: lastName,
                    status: status
                }
            })
        }



        setFirstName("");
        setLastName("");
        setStatus("active");

        navigate('/', { state: { message: `${state ? "Contact Edited" : "Contact Created"}` } });

    };
    return <div className="contact-form-container">
        <h2 className='create-head'>{state ? "Edit Contact" : "Create Contact"}</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <label htmlFor="first-name">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>

            <div className="status-radio">
                <label htmlFor="status-head">Status:</label>

                <label>
                    <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={status === 'active'}
                        onChange={() => setStatus('active')}
                        className="radio-input"
                    />
                    Active
                </label>
                <label>
                    <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={status === 'inactive'}
                        onChange={() => setStatus('inactive')}
                        className="radio-input"
                    />
                    Inactive
                </label>
            </div>
            <button type="submit" className="submit-button">
                Save Contact
            </button>
        </form>
    </div>
}
export default NewContact;
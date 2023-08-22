import { FC, useState, useEffect } from "react";
import './Contact.css'
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiH2 } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb'
import store from '../../reduxModel/store';
import { useLocation } from 'react-router-dom';
import PopupMessage from "../widgets/PopUp";
import ContactDetail from "../widgets/ContactDetail";

interface ContactModel {
    firstName: string;
    lastName: string;
    status: string;
    id: number;
}


const Contact: FC = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<ContactModel[]>([]);
    const [showContactDetail, setShowContactDetail] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactModel | null>(null);
    let { state } = useLocation();

    const message = state ? state.message : null;
    window.history.replaceState({}, document.title)

    useEffect(() => {
        setContacts(store.getState()); // Set initial contacts from the store
    }, []);



    const handleDelete = async (id: number) => {

        await store.dispatch({
            type: "contactDeleted",
            payload: {
                id: id,
            }
        })

        const updatedContacts = store.getState();
        setContacts(updatedContacts);
    }

    const handleShowContactDetail = (contact: ContactModel) => {
        setSelectedContact(contact);
        setShowContactDetail(true);
    };

    const handleCloseContactDetail = () => {
        setShowContactDetail(false);
    };
    return <>
        {showContactDetail && selectedContact && (
            <ContactDetail
                firstName={selectedContact.firstName}
                lastName={selectedContact.lastName}
                status={selectedContact.status}
                onClose={handleCloseContactDetail}
            />
        )}
        {message && <PopupMessage message={message} />}

        <div className="contact-page-container">
            <div className="head-wrapper">
                <h2 className="page-heading">Contacts</h2>
                <Link to='/CreateContact' className="blue-button">Create Contact</Link>

            </div>
            {contacts.length === 0 && <h2 style={{ fontSize: "18px", fontWeight: "500", marginTop: "70px" }}>No Contact Found <br /> Please Add Contact from Create Contact Button </h2>}
            {contacts.length > 0 && <div className="contact-table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td className={contact.status}>{contact.status}</td>
                                <td>
                                    <FaEye className="action-icons" onClick={() => handleShowContactDetail(contact)} />
                                    <TbEdit color="green" className="action-icons" style={{ margin: "0px 15px" }}
                                        onClick={() => {
                                            navigate('/CreateContact', {
                                                state: {
                                                    firstName: contact.firstName,
                                                    lastName: contact.lastName,
                                                    status: contact.status,
                                                    id: contact.id,
                                                },
                                            });
                                        }} />
                                    <RiDeleteBin6Line color="red" className="action-icons" onClick={() => handleDelete(contact.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    </>
}

export default Contact;
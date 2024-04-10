import React from 'react';
import './dialogChoose.scss';

const ContactList = ({ contacts, selectedContact, onSelectContact }) => {
    return (
        <div className="contact-list">
            {contacts.map((contact) => (
                <div
                    key={contact.id}
                    className={`contact-item ${
                        selectedContact === contact.id ? 'selected' : ''
                    }`}
                    onClick={() => onSelectContact(contact.id)}
                >
                    <img src={contact.avatar} alt={contact.name} />
                    <div className="contact-name">{contact.name}</div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;

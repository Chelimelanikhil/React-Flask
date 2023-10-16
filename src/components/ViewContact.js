import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

function ViewContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/view_contact/${id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('Contact details:', data.contact);

        setContact(data.contact);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contact details:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete_contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/'); // Redirect to the contact list page after successful deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit_contact/${id}`); // Redirect to the edit contact page with the contact's ID
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2>Contact Details:</h2>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : contact && Object.keys(contact).length > 0 ? (
            <>
              <img
                src={contact.image}
                alt={`${contact.first_name}'s image`}
                style={{ width: '200px', height: 'auto' }}
              />
              <p><strong>First Name:</strong> {contact.first_name}</p>
              <p><strong>Last Name:</strong> {contact.last_name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone Number:</strong> {contact.phone_number}</p>
            </>
          ) : (
            <p>Contact not found.</p>
          )}
        </div>
        <div>
          <br />
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ViewContact;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: null, // Initialize image with null
  });
  const [imageFile, setImageFile] = useState(null); // State to hold the selected image file

  useEffect(() => {
    // Fetch contact details for the given ID and populate the form
    fetch(`http://localhost:5000/view_contact/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        setContact(data.contact);
        setFormData({
          first_name: data.contact.first_name,
          last_name: data.contact.last_name,
          email: data.contact.email,
          phone_number: data.contact.phone_number,
          image: null, // Initialize image with null
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contact details:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, image: imageFile }); // Include the image in the form data
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData to send the form data and image
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('image', imageFile); // Add the image file to the FormData

    try {
      const response = await fetch(`http://localhost:5000/edit_contact/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Contact updated successfully');
        navigate(`/view_contact/${id}`); // Redirect to the view contact page after successful edit
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to update contact');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Profile Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <button type="submit">Update Contact</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditContact;

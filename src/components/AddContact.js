import React, { useState } from 'react';

function AddContact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Send the form data to the Flask server via an HTTP POST request
    fetch('http://localhost:5000/add_contact', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., show a success message
          console.log('Contact added successfully');
          // Clear the form
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            image: null,
          });
        } else {
          // Handle errors, e.g., show an error message
          console.error('Failed to add contact');
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <div className="centered-heading">
        <h2>Add Contact</h2>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Image:</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default AddContact;

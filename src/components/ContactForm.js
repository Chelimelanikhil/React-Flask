import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:5000/add_contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Contact added successfully');
      // Clear the form after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('An error occurred while adding the contact. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;

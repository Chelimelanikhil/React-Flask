import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/view_contacts');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching contacts:', error);
    }
  };

  return (
    <div>
      <h2>Contact List:</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="contact-list">
        {searchResults.length > 0 ? (
          <div>
            <h2>Search Results:</h2>
            {searchResults.map((contact) => (
  <div key={contact.id} className="contact">
    <Link to={`/view_contact/${contact.id}`}>
      <img
        src={`http://localhost:5000/static/${contact.image}`}  // Use the correct URL path
        alt={contact.first_name}
        className="col-md-2 rounded-circle"
        style={{ width: '100px', height: '100px' }}
      />
      <b>
        <span style={{ marginLeft: '20px' }}>{contact.first_name}</span>
      </b>
    </Link>
  </div>
))}

          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="contact">
              <Link to={`/view_contact/${contact.id}`}>
                <img
                  src={contact.image}
                  alt={contact.first_name}
                  className="col-md-2 rounded-circle"
                  style={{ width: '100px', height: '100px' }}
                />
                <b>
                  <span style={{ marginLeft: '20px' }}>{contact.first_name}</span>
                </b>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactList;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function ContactList() {
//   const [contacts, setContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/view_contacts');

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       setContacts(data.contacts);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter contacts based on the search term
//   const filteredContacts = contacts.filter((contact) => {
//     const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
//     const phoneNumber = contact.phone_number.toLowerCase();
//     const email = contact.email.toLowerCase();

//     // Check if any of the fields (first name, last name, phone number, email) contain the search term
//     return (
//       fullName.includes(searchTerm.toLowerCase()) ||
//       phoneNumber.includes(searchTerm.toLowerCase()) ||
//       email.includes(searchTerm.toLowerCase())
//     );
//   });

//   return (
//     <div>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by name, phone number, or email"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <h2>Contact List:</h2>
//       <div className="contact-list">
//         {filteredContacts.map((contact) => (
//           <div key={contact.id} className="contact">
//             <Link to={`/view_contact/${contact.id}`}>
//               <img
//                 src={contact.image}
//                 alt={contact.first_name}
//                 className="col-md-2 rounded-circle"
//                 style={{ width: '100px', height: '100px' }}
//               />
//               <b>
//                 <span style={{ marginLeft: '20px' }}>{contact.first_name}</span>
//               </b>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ContactList;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


// function ContactList() {
//   const [contacts, setContacts] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/view_contacts');

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       setContacts(data.contacts);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Contact List:</h2>
 

//       <div className="contact-list">
//         {contacts.map((contact) => (
//           <div key={contact.id} className="contact">
//             <Link to={`/view_contact/${contact.id}`}>
//               <img
//                 src={contact.image}
//                 alt={contact.first_name}
//                 className="col-md-2 rounded-circle"
//                 style={{ width: '100px', height: '100px' }}
//               />
//               <b>
//                 <span style={{ marginLeft: '20px' }}>{contact.first_name}</span>
//               </b>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ContactList;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


// function ContactList() {
//   // Initialize state variables
//   const [contacts, setContacts] = useState([]); // Holds the contact data


 

//   // Define an asynchronous function to fetch data from the API
//   const fetchData = async () => {
//     try {
//       // Make a GET request to the API endpoint
//       const response = await fetch('http://localhost:5000/view_contacts');

//       // Check if the response status is OK (200)
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       // Parse the JSON data from the response
//       const data = await response.json();

//       // Update the state with the fetched contacts and mark loading as false
//       setContacts(data.contacts);
     
//     } catch (error) {
//       // Handle errors by logging to the console and marking loading as false
//       console.error('Error fetching contacts:', error);
      
//     }
//   };

//   // Use the useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Render loading message while data is being fetched
 
//   // Render the contact list when data is available
//   return (
//     <div>
//       <h2>Contact List:</h2>
  
//       <div className="contact-list">
//       {contacts.map((contact) => (
//   <div key={contact.id} className="contact">
//     <Link to={`/view_contact/${contact.id}`}>
//       <img src={contact.image} alt={contact.first_name} className="col-md-2 rounded-circle" style={{ width: '100px', height: '100px' }} />
//       <b><span style={{ marginLeft: '20px' }}>{contact.first_name}</span></b>
//     </Link>
//   </div>
// ))}


//       </div>
//     </div>
//   );
// }

// export default ContactList;




// import React, { useState, useEffect } from 'react';

// function ContactList() {
//   // Initialize state variables
//   const [contacts, setContacts] = useState([]); // Holds the contact data
//   const [loading, setLoading] = useState(true); // Indicates if data is being fetched

//   // Define an asynchronous function to fetch data from the API
//   const fetchData = async () => {
//     try {
//       // Make a GET request to the API endpoint
//       const response = await fetch('http://localhost:5000/view_contacts');

//       // Check if the response status is OK (200)
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       // Parse the JSON data from the response
//       const data = await response.json();

//       // Update the state with the fetched contacts and mark loading as false
//       setContacts(data.contacts);
//       setLoading(false);
//     } catch (error) {
//       // Handle errors by logging to the console and marking loading as false
//       console.error('Error fetching contacts:', error);
//       setLoading(false);
//     }
//   };

//   // Use the useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Render loading message while data is being fetched
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // Render the contact list when data is available
//   return (
//     <div>
//       <h2>Contact List:</h2>
//       <ul>
//         {contacts.map(contact => (
//           <li key={contact.id}>
            
//             <a href={`/view_contact/${contact.id}`}>
//             <img src={contact.image} className="col-md-2" />
//               {contact.first_name}
//             </a>
           
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ContactList;
































// // import React, { useState, useEffect } from 'react';

// // function ContactList() {
// //   const [contacts, setContacts] = useState([]);
  

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('http://localhost:5000/view_contacts');
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         const data = await response.json();
// //         console.log(data);
// //         setContacts(data);
     
// //       } catch (error) {
// //         console.error('Error fetching contacts:', error);
    
// //       }
// //     };

// //     fetchData();
// //   }, []);


// //   return (
// //     <div>
// //       <h2>Contact List:</h2>
// //       <ul>
// //         {contacts.map((contact) => (
// //           <li key={contact.id}>
// //             <img src={contact.image} alt={`${contact.first_name} ${contact.last_name}`} />
           
// //               {contact.first_name}
          
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default ContactList;

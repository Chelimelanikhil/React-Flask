import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList';
import ViewContact from './components/ViewContact';
import AddContact from './components/AddContact'; // Import your AddContact component
import Navbar from './components/Navbar';
import EditContact from './components/EditContact';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Move Navbar outside of Routes */}
        <Routes>
          {/* Contact List Route */}
          <Route path="/" element={<ContactList />} />

          {/* View Contact Detail Route */}
          <Route path="/view_contact/:id" element={<ViewContact />} />

          {/* Add Contact Form Route */}
          <Route path="/add_contact" element={<AddContact />} />
          <Route path="/edit_contact/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React from 'react';
// // Import the ContactList component
// import './App.css';
// import ContactForm from './components/ContactForm';


// function App() {
//   return (
//     <div className="App">
//       <h1>Flask and React Demo</h1>
//      <ContactForm />
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ContactList from './components/ContactList'; // Import your ContactList component
// import ViewContact from './components/ViewContact'; // Import your ViewContact component

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Contact List Route */}
//           <Route path="/" element={<ContactList />} />

//           {/* View Contact Detail Route */}
//           <Route path="/view_contact/:id" element={<ViewContact />} />
         
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


 // App.js




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/data')
//       .then(response => {
//         console.log(response)
//         setData(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Flask and React Demo</h1>
//       <p>{data}</p>
//     </div>
//   );
// }

// export default App;




















// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

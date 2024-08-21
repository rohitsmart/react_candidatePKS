// import React, { useState, createContext } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Dashboard from './page/Dashboard';
// import Login from './components/login';
// import ProtectedRoute from './components/ProtectedRoute';
// import PositionedSnackbar from './components/custom/PositionedSnackbar';

// export const SnackbarContext = createContext();

// function App() {
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('error');

//   const showSnackbar = (message, severity = 'error') => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <SnackbarContext.Provider value={showSnackbar}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Router>
//           <div className="App">
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route
//                 path="/dashboard"
//                 element={<ProtectedRoute element={<Dashboard />} />}
//               />
//             </Routes>
//           </div>
//         </Router>
//         <PositionedSnackbar
//           open={snackbarOpen}
//           message={snackbarMessage}
//           severity={snackbarSeverity}
//           onClose={handleSnackbarClose}
//         />
//       </LocalizationProvider>
//     </SnackbarContext.Provider>
//   );
// }
// export default App;


import React from 'react';
import CubeLoader from './components/custom/CubeLoader';

function App() {
    return (
        <div>
            {/* Some other components */}
            <CubeLoader />
            {/* Some other components */}
        </div>
    );
}

export default App;

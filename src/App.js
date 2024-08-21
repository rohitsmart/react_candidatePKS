import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dashboard from './page/Dashboard';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute';
import PositionedSnackbar from './components/custom/PositionedSnackbar';
import CubeLoader from './components/custom/CubeLoader';

export const SnackbarContext = createContext();
export const LoaderContext = createContext(); // Create a context for loader visibility

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [loaderVisible, setLoaderVisible] = useState(false); // State for loader visibility

  const showSnackbar = (message, severity = 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showLoader = () => setLoaderVisible(true); // Function to show loader
  const hideLoader = () => setLoaderVisible(false); // Function to hide loader

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      <LoaderContext.Provider value={{ showLoader, hideLoader }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <div className="App">
              <CubeLoader visible={loaderVisible} /> {/* Add CubeLoader here */}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute element={<Dashboard />} />}
                />
              </Routes>
            </div>
          </Router>
          <PositionedSnackbar
            open={snackbarOpen}
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={handleSnackbarClose}
          />
        </LocalizationProvider>
      </LoaderContext.Provider>
    </SnackbarContext.Provider>
  );
}

export default App;

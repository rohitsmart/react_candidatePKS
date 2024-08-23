import React, { useContext, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid, Autocomplete, CircularProgress } from '@mui/material';
import axios from 'axios';
import ENDPOINTS from '../../assests/Endpoints';
import { SnackbarContext } from '../../App';
import LoadingButton from './LoadingButton';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

const CustomModal = ({ open, handleClose, candidateData, handleSubmit }) => {
  const [formData, setFormData] = React.useState({
    candidateId: candidateData.candidateId,
    date: candidateData.scheduled ? candidateData.interviewDate.split(' ')[0] : '',
    time: candidateData.scheduled ? candidateData.interviewDate.split(' ')[1] : '',
    employerName: candidateData.scheduled ? candidateData.interviewerName : '',
  });
  const showSnackbar = useContext(SnackbarContext);

  // const candidateInterviewerId = formData.employerName ? formData.employerName.split(' ')[0] : '';
  const loginUserempId = useSelector((state) => state.auth.user.empId);
  const token = useSelector((state) => state.auth.token);

  const [employees, setEmployees] = React.useState([]);
  const [employeeId, setEmployeeID] = useState("");
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (searchQuery) {
      fetchEmployees(searchQuery);
    } else {
      setEmployees([]);
    }
  }, [searchQuery]);

  const fetchEmployees = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${ENDPOINTS.SEARCH_EMPLOYEES}?search=${query}`);
      const employeeData = response.data.employeeData || [];
      setEmployees(employeeData);
      if (employeeData.length > 0) {
        setEmployeeID(employeeData[0].empId);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmployeeSelect = (event, newValue) => {
    setFormData({
      ...formData,
      employerName: newValue ? newValue.fullName : '',
    });
    setEmployeeID(newValue ? newValue.empId : '');
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    const formattedDate = moment(`${formData.date} ${formData.time}`, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm');

    const extractIdFromName = (name) => {
      const parts = name.split(' ');
      return parts[0];
    };

    const requestData = {
      candidateId: formData.candidateId,
      interviewerId: employeeId || extractIdFromName(formData.employerName),
      interviewDate: formattedDate,
    };
    try {
      const response = await axios.post(ENDPOINTS.INTERVIEW_SCHEDULED, requestData);
      showSnackbar('Interview scheduled successfully:', 'success');
      console.log('Interview scheduled successfully:', response.data);
    } catch (error) {
      console.error('Error scheduling interview:', error);
      showSnackbar('Error scheduling interview:', 'error');
    } finally {
      setLoading(false);
      handleClose();
    }
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {candidateData.scheduled ? 'Update Schedule' : 'Create Schedule'} for {candidateData.firstName} {candidateData.lastName}
        </Typography>

        <TextField
          label="Candidate ID"
          name="candidateId"
          value={formData.candidateId}
          disabled
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        {candidateData.scheduled ? (
          <TextField
            label="Employer Name"
            name="employerName"
            value={formData.employerName}
            disabled
            fullWidth
            margin="normal"
          />
        ) : (
          <Autocomplete
            freeSolo
            options={employees}
            getOptionLabel={(option) => `${option.empId} - ${option.fullName}`}
            loading={loading}
            onInputChange={(event, newValue) => {
              setSearchQuery(newValue);
            }}
            onChange={handleEmployeeSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employer Name"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={24} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {`${option.empId} - ${option.fullName}`}
              </li>
            )}
          />
        )}

        <LoadingButton onClick={handleFormSubmit} variant="contained" isLoading={loading} fullWidth sx={{ mt: 2 }}>
          Save
        </LoadingButton>
        <Button variant="contained" onClick={handleClose} fullWidth sx={{ mt: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
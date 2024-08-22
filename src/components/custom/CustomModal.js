import React from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';

const CustomModal = ({ open, handleClose, candidateData, handleSubmit }) => {
  const [formData, setFormData] = React.useState({
    candidateId: candidateData.candidateId,
    date: '',
    time: '',
    employerName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(formData);
    handleClose();
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
          Create Schedule for {candidateData.firstName} {candidateData.lastName}
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
        <TextField
          label="Employer Name"
          name="employerName"
          value={formData.employerName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleFormSubmit} fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
        <Button variant="contained" onClick={handleClose} fullWidth sx={{ mt: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;

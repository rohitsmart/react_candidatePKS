import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Grid,
    Paper,
    Divider,
    Box,
    TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearInterviewData, setInterviewData } from '../../redux/slices/interviewSlice';

const InterviewModal = ({ open, onClose, data, onSubmit }) => {
    const [formData, setFormData] = useState(data);

    const dispatch = useDispatch();
    const storedData = useSelector((state) => state.interview[data.interviewId]);
    useEffect(() => {
        setFormData(data);
    }, [data]);

    useEffect(() => {
        if (storedData) {
            setFormData(storedData);
        } else {
            setFormData(data);
        }
    }, [data, storedData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        dispatch(setInterviewData({ interviewId: formData.interviewId, data: { ...formData, [name]: value } }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        dispatch(clearInterviewData({ interviewId: formData.interviewId }));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={2} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Candidate Information
                            </Typography>
                            <Divider />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Full Name"
                                name="fullName"
                                value={`${formData.firstName || ''} ${formData.lastName || ''}`}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                value={formData.email || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Phone"
                                name="phone"
                                value={formData.phone || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Address"
                                name="address"
                                value={formData.address || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="High School Pass Out"
                                name="highSchoolPassOut"
                                value={formData.highSchoolPassOut || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Intermediate Pass Out"
                                name="intermediatePassOut"
                                value={formData.intermediatePassOut || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Bachelor Degree"
                                name="bachelorDegree"
                                value={formData.bachelorDegree || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Bachelor Pass Out"
                                name="bachelorPassOut"
                                value={formData.bachelorPassOut || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Master Degree"
                                name="masterDegree"
                                value={formData.masterDegree || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Master Pass Out"
                                name="masterPassOut"
                                value={formData.masterPassOut || ''}
                                disabled
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper elevation={2} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Ratings & Skills
                            </Typography>
                            <Divider />
                            <Box sx={{ display: 'grid', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="DSA Rating"
                                    name="dsaRating"
                                    type="number"
                                    value={formData.dsaRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="React Rating"
                                    name="reactRating"
                                    type="number"
                                    value={formData.reactRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="JavaScript Rating"
                                    name="javascriptRating"
                                    type="number"
                                    value={formData.javascriptRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="OOPs Rating"
                                    name="oopsRating"
                                    type="number"
                                    value={formData.oopsRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="SQL Rating"
                                    name="sqlRating"
                                    type="number"
                                    value={formData.sqlRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Java Rating"
                                    name="javaRating"
                                    type="number"
                                    value={formData.javaRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="PHP Rating"
                                    name="phpRating"
                                    type="number"
                                    value={formData.phpRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Python Rating"
                                    name="pythonRating"
                                    type="number"
                                    value={formData.pythonRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="HTML Rating"
                                    name="htmlRating"
                                    type="number"
                                    value={formData.htmlRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="CSS Rating"
                                    name="cssRating"
                                    type="number"
                                    value={formData.cssRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Bootstrap Rating"
                                    name="bootstrapRating"
                                    type="number"
                                    value={formData.bootstrapRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Material UI Rating"
                                    name="materialUiRating"
                                    type="number"
                                    value={formData.materialUiRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Tailwind CSS Rating"
                                    name="tailwindCssRating"
                                    type="number"
                                    value={formData.tailwindCssRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Flutter Rating"
                                    name="flutterRating"
                                    type="number"
                                    value={formData.flutterRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="React Native Rating"
                                    name="reactNativeRating"
                                    type="number"
                                    value={formData.reactNativeRating || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Machine Learning Rating"
                                    name="machineLearning"
                                    type="number"
                                    value={formData.machineLearning || ''}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={2} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Interview Information
                            </Typography>
                            <Divider />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Interview ID"
                                name="interviewId"
                                value={formData.interviewId || ''}
                                onChange={handleChange}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Interviewer Name"
                                name="interviewerName"
                                value={formData.interviewerName || ''}
                                disabled
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Interview Date"
                                name="interviewDate"
                                value={formData.interviewDate}
                                disabled

                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Interview Status"
                                name="interviewStatus"
                                value={formData.interviewStatus || ''}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Communication"
                                name="communication"
                                value={formData.communication || ''}
                                onChange={handleChange}
                                InputProps={{ style: { fontWeight: 'bold' } }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Dressing Sense"
                                name="dressingSense"
                                value={formData.dressingSense || ''}
                                onChange={handleChange}
                                InputProps={{ style: { fontWeight: 'bold' } }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Overall"
                                name="overAll"
                                value={formData.overAll || ''}
                                onChange={handleChange}
                                InputProps={{ style: { fontWeight: 'bold' } }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Feedback"
                                name="feedback"
                                multiline
                                rows={4}
                                value={formData.feedback || ''}
                                onChange={handleChange}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
    
            </DialogActions>
        </Dialog>
    );
};

export default InterviewModal;
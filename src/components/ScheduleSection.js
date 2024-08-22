import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';
import CustomCard from './custom/CustomCard';
import ENDPOINTS from '../assests/Endpoints';

export const ScheduleSection = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(ENDPOINTS.FETCH_ALL_CANDIDATES, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCandidates(response.data.candidates);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
<Container sx={{ mt: 4 }} maxWidth="xl"> 
    <Grid container spacing={3}>
        {candidates.length > 0 ? (
            candidates.map((candidate) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={candidate.candidateId}>
                    <CustomCard candidate={candidate} />
                </Grid>
            ))
        ) : (
            <Grid item xs={12}>
                <div>No candidates found.</div>
            </Grid>
        )}
    </Grid>
</Container>

    );
};

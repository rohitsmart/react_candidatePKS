import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const todayInterviews = [
    { name: 'Scheduled', value: 10 },
    { name: 'Completed', value: 1 }
];

const candidateTypes = [
    { type: 'Front-end', count: 5 },
    { type: 'Back-end', count: 3 },
    { type: 'Mobile', count: 2 },
    { type: 'Full Stack', count: 7 }
];

const interviewsLastMonth = [
    { name: 'Week 1', interviews: 5 },
    { name: 'Week 2', interviews: 8 },
    { name: 'Week 3', interviews: 6 },
    { name: 'Week 4', interviews: 7 }
];

const upcomingInterviews = [
    { date: '2024-08-19', count: 2 },
    { date: '2024-08-20', count: 3 },
    { date: '2024-08-21', count: 1 }
];

const ongoingInterviews = [
    { name: 'John Doe', position: 'Front-end Developer' },
    { name: 'Jane Smith', position: 'Back-end Developer' }
];

const HomeSection = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Home Section
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Today's Interviews</Typography>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={todayInterviews}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {todayInterviews.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Candidate Types</Typography>
                            <BarChart
                                width={500}
                                height={300}
                                data={candidateTypes}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Interviews Last Month</Typography>
                            <BarChart
                                width={500}
                                height={300}
                                data={interviewsLastMonth}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="interviews" fill="#82ca9d" />
                            </BarChart>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Upcoming Interviews</Typography>
                            <ul>
                                {upcomingInterviews.map((interview, index) => (
                                    <li key={index}>
                                        {interview.date}: {interview.count} interviews
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Ongoing Interviews</Typography>
                            <ul>
                                {ongoingInterviews.map((interview, index) => (
                                    <li key={index}>
                                        {interview.name} - {interview.position}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeSection;

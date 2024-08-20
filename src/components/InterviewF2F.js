import { Typography } from "@mui/material";
import { useEffect } from "react";

export const InterviewF2F = ({ candidateId }) => {
    useEffect(() => {
        document.title = 'Interview';
    }, []);
    return (
        <>
            <Typography variant="h5">Interview Details for Candidate ID: {candidateId}</Typography>
        </>
    );
};

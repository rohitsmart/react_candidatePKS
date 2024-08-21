import React from 'react';
import { Button, CircularProgress, styled } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    '& .MuiCircularProgress-root': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -12,
        marginTop: -12,
        color: theme.palette.common.white,
    },
}));

const LoadingButton = ({ isLoading, children, ...props }) => (
    <StyledButton
        variant="contained"
        color="primary"
        disabled={isLoading}
        {...props}
    >
        {isLoading && <CircularProgress size={24} />}
        {children}
    </StyledButton>
);

export default LoadingButton;

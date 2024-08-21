import React from 'react';
import { Box } from '@mui/material';
import './CubeLoader.css';  // Assuming the CSS is in this file

const CubeLoader = ({ visible }) => {
    return (
        visible && (
            <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
                <div className="cube-loader">
                    <div className="cube">
                        <div className="cube-face"></div>
                        <div className="cube-face"></div>
                        <div className="cube-face"></div>
                        <div className="cube-face"></div>
                        <div className="cube-face"></div>
                        <div className="cube-face"></div>
                    </div>
                </div>
            </Box>
        )
    );
};

export default CubeLoader;

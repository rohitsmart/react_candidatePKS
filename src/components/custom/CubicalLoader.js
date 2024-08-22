import { Box } from "@mui/material";

export const CubicalLoader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: 'transparent',
                    perspective: 1000,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        animation: 'rotateCube 2s infinite linear',
                    }}
                >
                    {[...Array(6)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: `hsl(${i * 60}, 100%, 50%)`,
                                opacity: 0.8,
                                transform: `rotateX(${Math.floor(i / 2) * 90}deg) rotateY(${i % 2 === 0 ? 90 : 0}deg) translateZ(32px)`,
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
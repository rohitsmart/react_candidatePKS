import React, { useContext, useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EmployeeSection from '../components/EmployeeSection';
import HomeSection from '../components/HomeSection';
import CandidateSection from '../components/CandidateSection';
import { ScheduleSection } from '../components/ScheduleSection';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/slices/authSlice';
import { SnackbarContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { InterviewSection } from '../components/InterviewSection';

const drawerWidth = 240;

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const showSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();
    const [interviewScheduled,setInterviewScheduled]= useState(false);

    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedSection, setSelectedSection] = useState('Home');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const handleSectionChange = (section) => {
        if (section === 'Logout') {
            handleLogout();
        } else {
            setSelectedSection(section);
        }
    };

    const handleCandidateMatch = (candidateId) => {
        console.log("Matched Candidate ID:", candidateId);
        setInterviewScheduled(true);
    };

    const handleLogout = () => {
        dispatch(clearToken());
        showSnackbar('You have been logged out successfully.', 'success');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['Home', 'Employee', 'Candidate', 'Schedule', 'Interview', 'Settings', 'Logout'].map((text, index) => {
                    let icon;
                    switch (text) {
                        case 'Home':
                            icon = <HomeIcon />;
                            break;
                        case 'Employee':
                            icon = <PeopleIcon />;
                            break;
                        case 'Candidate':
                            icon = <PeopleIcon />;
                            break;
                        case 'Schedule':
                            icon = <EventIcon />;
                            break;
                        case 'Interview':
                            icon = <WorkIcon />;
                            break;
                        case 'Settings':
                            icon = <SettingsIcon />;
                            break;
                        case 'Logout':
                            icon = <LogoutIcon />;
                            break;
                        default:
                            icon = null;
                    }
                    return (
                        <ListItem 
                            button 
                            key={text} 
                            onClick={() => handleSectionChange(text)}
                            selected={selectedSection === text}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.action.selected,
                                    color: theme.palette.primary.main,
                                    '& .MuiListItemIcon-root': {
                                        color: theme.palette.primary.main,
                                    },
                                    borderLeft: `4px solid ${theme.palette.warning.main}`,
                                    backgroundColor: theme.palette.action.hover,
                                },
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? mobileOpen : undefined}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {selectedSection === 'Home' && <HomeSection />}
                {selectedSection === 'Employee' && <EmployeeSection />}
                {selectedSection === 'Candidate' && <CandidateSection />}
                {selectedSection === 'Schedule' && (
                <ScheduleSection onCandidateMatch={handleCandidateMatch} />)}
                 {selectedSection === 'Interview' && (
                <InterviewSection />)}
            </Box>
        </Box>
    );
}

export default Dashboard;

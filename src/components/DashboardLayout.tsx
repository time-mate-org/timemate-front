import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Clientes', icon: 'fas fa-users', path: '/dashboard/clients' },
    { text: 'Profissionais', icon: 'fas fa-user-tie', path: '/dashboard/professionals' },
    { text: 'Serviços', icon: 'fas fa-briefcase', path: '/dashboard/services' },
    { text: 'Atendimentos', icon: 'fas fa-calendar-check', path: '/dashboard/appointments' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: '#0a0a0a',
            borderRight: 'none'
          }
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 255, 157, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 255, 157, 0.2)'
                  }
                }
              }}
            >
              <ListItemIcon>
                <i className={`${item.icon} fa-fw`} />
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#e5e5e5' }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#0a0a0a', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
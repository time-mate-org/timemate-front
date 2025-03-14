import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Função de exclusão
const handleDelete = async (id: number) => {
  if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
    console.log("🚀 ~ handleDelete ~ id:", id);
    // Atualize a lista ou use queryClient.invalidateQueries()
  }
};

const ServiceList = () => {
  const navigate = useNavigate();
  const services = [
    { id: 1, name: 'Consulta Médica', duration: '30min', price: 250 },
    { id: 2, name: 'Consulta Jurídica', duration: '1h', price: 500 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          mb: 3,
          bgcolor: '#00ff9d',
          color: '#0a0a0a',
          '&:hover': { bgcolor: '#00e68a' }
        }}
        onClick={() => navigate('new')}
      >
        Novo Serviço
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#1a1a1a' }}>
            <TableRow>
              <TableCell sx={{ color: '#00ff9d', fontWeight: 600 }}>Serviço</TableCell>
              <TableCell sx={{ color: '#00ff9d', fontWeight: 600 }}>Duração</TableCell>
              <TableCell sx={{ color: '#00ff9d', fontWeight: 600 }}>Preço</TableCell>
              <TableCell sx={{ color: '#00ff9d', fontWeight: 600 }}>Operações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                sx={{
                  '&:nth-of-type(odd)': { bgcolor: '#121212' },
                  '&:hover': { bgcolor: '#1a1a1a' }
                }}
              >
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      onClick={() => navigate(`edit/${service.id}`)}
                      sx={{ color: '#00ff9d' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(service.id)}
                      sx={{ color: '#ff4444' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceList;
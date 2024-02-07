import React from 'react';
import { Typography, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
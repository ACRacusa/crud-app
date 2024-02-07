import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function SuccessModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" align="center">
          Registration Successful
        </Typography>
      </DialogTitle>
      <DialogContent style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: '64px', color: '#4caf50' }} />
        </div>
        <Typography variant="body1" align="center">
          Congratulations! Your registration was successful.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          Please log in to continue.
        </Typography>
      </DialogContent>
      <DialogActions style={{ paddingBottom: '1rem', justifyContent: 'center' }}>
        <Button onClick={onClose} color="success" variant="contained">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ErrorModal({ open, onClose, errorMessage }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" align="center">
          Registration Error
        </Typography>
      </DialogTitle>
      <DialogContent style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <ErrorOutlineIcon sx={{ fontSize: '64px', color: '#f44336' }} />
        </div>
        <Typography variant="body1" align="center">
          Oops! An error occurred during registration.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          {errorMessage}
        </Typography>
      </DialogContent>
      <DialogActions style={{ paddingBottom: '1rem', justifyContent: 'center' }}>
        <Button onClick={onClose} color="error" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ACRacusa">
        Aldrin Racusa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post('http://localhost:8000/auth/register/', {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { access_token, refresh_token } = response.data;

      // Handle successful registration
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      setOpenSuccessModal(true);
    } catch (error) {
        // Handle registration error
        console.error(error);
        if (error.response && error.response.data && error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        }
        else if(error.message) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An error occurred during registration.');
        }
        setOpenErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate('/login');
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <SuccessModal open={openSuccessModal} onClose={handleCloseSuccessModal} />
      <ErrorModal open={openErrorModal} onClose={handleCloseErrorModal} errorMessage={errorMessage} />
    </ThemeProvider>
  );
}
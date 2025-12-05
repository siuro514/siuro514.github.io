import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography
            sx={{
              fontSize: '5rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3a3a3a 0%, #6750A4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: 4,
              fontSize: '1rem',
              maxWidth: '500px',
            }}
          >
            Sorry, the page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/${lang}/`)}
            sx={{
              background: 'linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            ← Back to Home
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

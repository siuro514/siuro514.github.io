import { Container, Box, Typography, Grid, Card, CardActionArea, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getBlogPosts } from '../data/blog';

export default function BlogPage() {
    const { t, i18n } = useTranslation();
    const { lang } = useParams<{ lang: string }>();
    const langPrefix = lang ? `/${lang}` : '/en';

    // Get posts based on current language
    // Prioritize URL param, fallback to i18n.language
    const currentLang = lang || i18n.language;
    const posts = getBlogPosts(currentLang);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 50%, #4a4a4a 100%)',
                    color: 'white',
                    py: { xs: 6, md: 8 },
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            fontFamily: '"Inter", "Noto Sans TC", -apple-system, sans-serif',
                            mb: 2,
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        }}

                    >
                        {t('blog.title', 'Blog')}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 500,
                            fontFamily: '"Noto Sans TC", "Inter", -apple-system, sans-serif',
                            opacity: 0.95,
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        {t('blog.subtitle', 'Sharing insights on technology, tools, and productivity')}
                    </Typography>
                </Container>
            </Box>

            {/* Blog List Section */}
            <Container maxWidth="lg" sx={{ flexGrow: 1, py: 8 }}>
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} md={6} key={post.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                    }
                                }}
                            >
                                <CardActionArea
                                    component={RouterLink}
                                    to={`${langPrefix}/blog/${post.id}`}
                                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 3 }}
                                >
                                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        {post.tags.map(tag => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                                    fontWeight: 500
                                                }}
                                            />
                                        ))}
                                    </Box>

                                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                                        {post.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {post.date}
                                    </Typography>

                                    <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                                        {post.summary}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', fontWeight: 600, mt: 'auto' }}>
                                        {t('blog.readMore', 'Read More')}
                                        <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Footer />
        </Box >
    );
}

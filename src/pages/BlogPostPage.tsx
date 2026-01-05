import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Chip, Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getBlogPost } from '../data/blog';

export default function BlogPostPage() {
    const { id, lang } = useParams<{ id: string; lang: string }>();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const langPrefix = lang ? `/${lang}` : '/en';

    const post = id ? getBlogPost(id, i18n.language) : undefined;

    useEffect(() => {
        if (post) {
            document.title = `${post.title} - Ganttleman`;
            // Update meta description if needed
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', post.summary);
            }
        }
    }, [post]);

    if (!post) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Container maxWidth="md" sx={{ py: 8, textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        Article not found
                    </Typography>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`${langPrefix}/blog`)}>
                        {t('blog.backToBlog', '回到部落格')}
                    </Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(`${langPrefix}/blog`)}
                    sx={{ mb: 4 }}
                >
                    {t('blog.backToBlog', '回到部落格')}
                </Button>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: '#fff' }}>
                    {/* Header */}
                    <Box sx={{ mb: 4, borderBottom: '1px solid #eee', pb: 4 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            {post.tags.map(tag => (
                                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#f5f5f5' }} />
                            ))}
                        </Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.date}
                        </Typography>
                    </Box>

                    {/* Content */}
                    <Box
                        sx={{
                            '& h1': { display: 'none' }, // Title already shown above
                            '& h2': { fontSize: '1.8rem', fontWeight: 700, mt: 4, mb: 2, pb: 1, borderBottom: '1px solid #eee' },
                            '& h3': { fontSize: '1.4rem', fontWeight: 600, mt: 3, mb: 1.5 },
                            '& p': { fontSize: '1.1rem', lineHeight: 1.8, mb: 2, color: '#333' },
                            '& ul, & ol': { mb: 2, pl: 3 },
                            '& li': { mb: 1, fontSize: '1.1rem', lineHeight: 1.8 },
                            '& pre': {
                                bgcolor: '#f5f5f5',
                                p: 2,
                                borderRadius: 2,
                                overflowX: 'auto',
                                mb: 3,
                                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
                            },
                            '& code': {
                                bgcolor: '#f5f5f5',
                                p: 0.5,
                                borderRadius: 1,
                                fontSize: '0.9em',
                                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
                            },
                            '& blockquote': {
                                borderLeft: '4px solid #ddd',
                                pl: 2,
                                color: 'text.secondary',
                                fontStyle: 'italic',
                                my: 2
                            },
                            '& table': {
                                width: '100%',
                                borderCollapse: 'collapse',
                                my: 3
                            },
                            '& th, & td': {
                                border: '1px solid #ddd',
                                p: 1.5,
                                textAlign: 'left'
                            },
                            '& th': {
                                bgcolor: '#f9f9f9',
                                fontWeight: 600
                            },
                            '& a': {
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }
                        }}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </Box>
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
}

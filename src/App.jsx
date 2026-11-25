import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import NavigationBar from './components/common/navigation-bar.jsx';
import SiteFooter from './components/common/site-footer.jsx';
import HomePage from './pages/home-page.jsx';
import AboutPage from './pages/about-page.jsx';
import ProjectsPage from './pages/projects-page.jsx';

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationBar />

      <Box
        component="main"
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/projects" element={ <ProjectsPage /> } />
            <Route path="*" element={ <Navigate to="/" replace /> } />
          </Routes>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}

export default App;

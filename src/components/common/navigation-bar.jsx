import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

/**
 * NavigationBar 컴포넌트
 *
 * 상단 고정 내비게이션 바입니다. 배경은 Accent(짙은 남색), 활성 탭은 Primary(연두) 밑줄로 표시합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <NavigationBar />
 */
function NavigationBar() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        bgcolor: 'var(--color-accent)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Container
        maxWidth="md"
        component="nav"
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 3 },
        }}
      >
        <Box
          component={ NavLink }
          to="/"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          My
          <Box component="span" sx={{ color: 'var(--color-primary-light)' }}>
            Portfolio
          </Box>
        </Box>

        <Box component="ul" sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, listStyle: 'none', m: 0, p: 0 }}>
          {NAV_ITEMS.map((item) => (
            <Box component="li" key={ item.to }>
              <Box
                component={ NavLink }
                to={ item.to }
                end={ item.to === '/' }
                sx={{
                  display: 'block',
                  px: { xs: 1, sm: 1.5 },
                  py: 1,
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  fontWeight: 500,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  borderBottom: '3px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  '&:hover': { color: '#FFFFFF' },
                  '&.active': {
                    color: '#FFFFFF',
                    fontWeight: 700,
                    borderBottomColor: 'var(--color-primary)',
                  },
                }}
              >
                {item.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default NavigationBar;

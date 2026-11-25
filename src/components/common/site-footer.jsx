import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ContactIconButtons from './contact-icon-buttons.jsx';
import SnsLinks from './sns-links.jsx';

/**
 * SiteFooter 컴포넌트
 *
 * 모든 페이지 하단에 고정으로 붙는 푸터입니다. 전화 · 메일 아이콘 버튼과 SNS 아이콘을 한 줄로 배치합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <SiteFooter />
 */
function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: 'var(--color-ivory)',
        borderTop: '1px solid var(--color-ivory-line)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
            문의 · 연락처
          </Box>
          <Box
            component={ RouterLink }
            to="/#contact"
            sx={{
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              '&:hover': { color: 'var(--color-navy)', textDecoration: 'underline' },
            }}
          >
            방명록 남기기
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ContactIconButtons />
          <Box sx={{ width: '1px', height: 20, bgcolor: 'var(--color-ivory-line)' }} />
          <SnsLinks color="var(--color-text-secondary)" />
        </Box>
      </Container>
    </Box>
  );
}

export default SiteFooter;

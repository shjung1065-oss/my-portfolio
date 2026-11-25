import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ContactIconButtons from '../common/contact-icon-buttons.jsx';
import SnsLinks from '../common/sns-links.jsx';
import GuestbookBoard from '../guestbook/guestbook-board.jsx';

/**
 * ContactSection 컴포넌트
 *
 * Home 탭의 Contact 섹션입니다. 인사말 → 문의(전화 · 메일 · SNS) → 방명록 순서로 세로 배치합니다.
 *
 * Props:
 * @param {string} label - 상단 섹션 번호 텍스트 (예: 'SECTION 05') [Required]
 *
 * Example usage:
 * <ContactSection label="SECTION 05" />
 */
function ContactSection({ label }) {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        scrollMarginTop: 80,
        bgcolor: 'var(--color-ivory)',
        border: '1px solid var(--color-ivory-line)',
        borderRadius: 3,
        px: { xs: 2.5, md: 6 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box component="header" sx={{ mb: { xs: 4, md: 5 } }}>
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            mb: 1.5,
            px: 1.25,
            py: 0.25,
            borderRadius: 10,
            bgcolor: 'var(--color-navy)',
            color: 'var(--color-on-navy)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </Box>
        <Typography
          component="h2"
          sx={{
            mb: 1.5,
            color: 'var(--color-text-primary)',
            fontWeight: 700,
            fontSize: { xs: '1.375rem', md: '1.75rem' },
            lineHeight: 1.2,
          }}
        >
          Contact
        </Typography>
        <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.6 }}>
          궁금한 점이나 함께하고 싶은 일이 있다면 편하게 연락 주세요.
          <br />
          짧은 인사도 방명록에 남겨 주시면 반갑게 읽을게요.
        </Typography>
      </Box>

      <Box
        sx={{
          mb: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          borderBottom: '1px solid var(--color-ivory-line)',
        }}
      >
        <Box sx={{ mb: 2, color: 'var(--color-text-primary)', fontWeight: 700, fontSize: { xs: '1rem', md: '1.1rem' } }}>
          문의
        </Box>
        <ContactIconButtons isLabeled />
        <Box sx={{ mt: 2, ml: -0.5 }}>
          <SnsLinks color="var(--color-text-secondary)" />
        </Box>
      </Box>

      <GuestbookBoard />
    </Box>
  );
}

export default ContactSection;

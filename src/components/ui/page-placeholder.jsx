import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * PagePlaceholder 컴포넌트
 *
 * 아직 개발되지 않은 페이지의 자리를 표시합니다.
 *
 * Props:
 * @param {string} title - 페이지 제목 [Required]
 * @param {string} description - 안내 문구 [Required]
 *
 * Example usage:
 * <PagePlaceholder title="About Me" description="About Me 페이지가 개발될 공간입니다." />
 */
function PagePlaceholder({ title, description }) {
  return (
    <Box
      component="section"
      sx={{
        textAlign: 'center',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        bgcolor: 'var(--color-bg-secondary)',
        border: '2px dashed var(--color-primary)',
        borderRadius: 3,
      }}
    >
      <Typography
        component="h1"
        sx={{
          mb: 2,
          color: 'var(--color-text-primary)',
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '3rem' },
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ width: 48, height: 4, mx: 'auto', mb: 3, borderRadius: 2, bgcolor: 'var(--color-secondary)' }} />
      <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Box>
  );
}

export default PagePlaceholder;

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/**
 * SectionCard 컴포넌트
 *
 * 섹션 하나를 카드로 구분해 보여줍니다. 왼쪽 포인트 바와 라벨 배지로 섹션 역할을 명확히 표시합니다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional]
 * @param {string} label - 상단 배지 텍스트 (예: 'SECTION 01') [Required]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명 문구 [Required]
 * @param {boolean} isHero - 히어로 그라데이션 배경 사용 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <SectionCard label="SECTION 01" title="Hero" description="..." isHero />
 */
function SectionCard({ id, label, title, description, isHero = false }) {
  return (
    <Card
      component="section"
      id={ id }
      elevation={ 0 }
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: isHero ? 'var(--gradient-hero)' : 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 6,
          bgcolor: isHero ? 'var(--color-primary)' : 'var(--color-secondary)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: isHero ? 6 : 4 }, pl: { xs: 4, md: isHero ? 7 : 5 } }}>
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            mb: 1.5,
            px: 1.25,
            py: 0.25,
            borderRadius: 10,
            bgcolor: 'var(--color-primary-light)',
            color: 'var(--color-text-primary)',
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
            fontSize: isHero ? { xs: '2rem', md: '3rem' } : { xs: '1.375rem', md: '1.75rem' },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-text-secondary)',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SectionCard;

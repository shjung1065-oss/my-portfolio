import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const TARGET_ID = 'guestbook-form';

/**
 * GuestbookLinkButton 컴포넌트
 *
 * Home 탭 Contact 섹션의 방명록 작성 폼으로 이동하는 버튼입니다.
 * 다른 페이지에서는 Home(/#guestbook-form)으로 이동한 뒤 스크롤하고, Home 에서는 바로 스크롤합니다.
 *
 * Props:
 * @param {string} size - 버튼 크기 'small' | 'medium' | 'large' [Optional, 기본값: 'medium']
 *
 * Example usage:
 * <GuestbookLinkButton size="large" />
 */
function GuestbookLinkButton({ size = 'medium' }) {
  const handleClick = () => {
    document.getElementById(TARGET_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Button
      component={ RouterLink }
      to={ `/#${TARGET_ID}` }
      onClick={ handleClick }
      variant="contained"
      disableElevation
      size={ size }
      startIcon={ <EditOutlinedIcon /> }
      sx={{
        bgcolor: 'var(--color-navy)',
        color: 'var(--color-on-navy)',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        '&:hover': { bgcolor: 'var(--color-navy)', opacity: 0.9 },
      }}
    >
      방명록으로 문의하기
    </Button>
  );
}

export default GuestbookLinkButton;

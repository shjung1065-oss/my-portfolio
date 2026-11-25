import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { fetchGuestbookEntry } from '../../utils/guestbook-api.js';
import { formatDate } from '../../utils/format-date.js';

const navButtonSx = {
  flex: 1,
  minHeight: 56,
  justifyContent: 'center',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-ivory-line)',
  bgcolor: 'var(--color-bg-primary)',
  fontSize: '1rem',
  '&:hover': { borderColor: 'var(--color-navy)', bgcolor: 'var(--color-bg-primary)' },
  '&.Mui-disabled': { borderColor: 'var(--color-ivory-line)' },
};

/**
 * GuestbookDetail 컴포넌트
 *
 * 방명록 한 건을 보여주고, 하단에 이전 글 · 목록으로 · 다음 글 버튼을 크게 배치합니다.
 *
 * Props:
 * @param {number} entryId - 보여줄 방명록 번호 [Required]
 * @param {function} onNavigate - 이전/다음 글로 이동할 때 호출 (id: number) [Required]
 * @param {function} onBack - 목록으로 돌아갈 때 호출 [Required]
 *
 * Example usage:
 * <GuestbookDetail entryId={ 3 } onNavigate={ setId } onBack={ closeDetail } />
 */
function GuestbookDetail({ entryId, onNavigate, onBack }) {
  /** 응답을 요청한 글 번호(id)와 함께 저장 → 번호가 다르면 아직 로딩 중으로 판단 */
  const [response, setResponse] = useState({ id: null, data: null, hasError: false });

  useEffect(() => {
    let isActive = true;
    fetchGuestbookEntry(entryId)
      .then((data) => { if (isActive) setResponse({ id: entryId, data, hasError: false }); })
      .catch(() => { if (isActive) setResponse({ id: entryId, data: null, hasError: true }); });
    return () => { isActive = false; };
  }, [entryId]);

  const isCurrent = response.id === entryId;
  const result = isCurrent ? response.data : null;
  const hasError = isCurrent && response.hasError;
  const entry = result?.entry;

  return (
    <Box component="article">
      {!result && !hasError && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={ 28 } sx={{ color: 'var(--color-navy)' }} />
        </Box>
      )}

      {hasError && <Alert severity="error">글을 불러오지 못했어요.</Alert>}
      {result && !entry && <Alert severity="info">삭제되었거나 없는 글이에요.</Alert>}

      {entry && (
        <Box sx={{ borderTop: '2px solid var(--color-navy)', borderBottom: '1px solid var(--color-ivory-line)' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: 1,
              px: { xs: 1, md: 2 },
              py: 2,
              borderBottom: '1px solid var(--color-ivory-line)',
            }}
          >
            <Box sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1.05rem' }}>
              {entry.display_name}
            </Box>
            {entry.affiliation && (
              <Box sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{entry.affiliation}</Box>
            )}
            <Box sx={{ ml: 'auto', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              No.{entry.id} · {formatDate(entry.created_at)}
            </Box>
          </Box>
          <Box
            sx={{
              px: { xs: 1, md: 2 },
              py: { xs: 3, md: 4 },
              minHeight: 140,
              color: 'var(--color-text-primary)',
              fontSize: { xs: '1rem', md: '1.05rem' },
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {entry.message}
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mt: 3 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={ <ChevronLeftIcon /> }
          disabled={ !result?.prev }
          onClick={ () => onNavigate(result.prev.id) }
          sx={ navButtonSx }
        >
          이전 글
        </Button>
        <Button
          variant="contained"
          size="large"
          disableElevation
          startIcon={ <FormatListBulletedIcon /> }
          onClick={ onBack }
          sx={{
            flex: 1,
            minHeight: 56,
            fontSize: '1rem',
            fontWeight: 700,
            bgcolor: 'var(--color-navy)',
            color: 'var(--color-on-navy)',
            '&:hover': { bgcolor: 'var(--color-navy)', opacity: 0.9 },
          }}
        >
          목록으로
        </Button>
        <Button
          variant="outlined"
          size="large"
          endIcon={ <ChevronRightIcon /> }
          disabled={ !result?.next }
          onClick={ () => onNavigate(result.next.id) }
          sx={ navButtonSx }
        >
          다음 글
        </Button>
      </Box>
    </Box>
  );
}

export default GuestbookDetail;

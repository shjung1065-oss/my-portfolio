import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

import { formatDate } from '../../utils/format-date.js';

/**
 * GuestbookList 컴포넌트
 *
 * 방명록 목록을 한 줄씩 보여줍니다. (제목만 노출) 항목을 누르면 상세 화면으로 이동합니다.
 *
 * Props:
 * @param {Array} entries - 방명록 목록 [Required]
 * @param {function} onSelect - 항목 선택 시 호출 (id: number) [Required]
 *
 * Example usage:
 * <GuestbookList entries={ entries } onSelect={ openDetail } />
 */
function GuestbookList({ entries, onSelect }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: '1px solid var(--color-ivory-line)' }}>
      {entries.map((entry) => (
        <Box component="li" key={ entry.id } sx={{ borderBottom: '1px solid var(--color-ivory-line)' }}>
          <ButtonBase
            onClick={ () => onSelect(entry.id) }
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              px: { xs: 1, md: 2 },
              py: 2,
              textAlign: 'left',
              transition: 'background-color 0.15s ease',
              '&:hover': { bgcolor: 'var(--color-bg-primary)' },
            }}
          >
            <Box
              sx={{
                minWidth: 32,
                pt: 0.25,
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {entry.id}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  color: 'var(--color-text-primary)',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {entry.title}
              </Box>
              <Box sx={{ mt: 0.5, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                {`${entry.display_name} · ${formatDate(entry.created_at)}`}
              </Box>
            </Box>
          </ButtonBase>
        </Box>
      ))}
    </Box>
  );
}

export default GuestbookList;

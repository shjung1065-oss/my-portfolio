import { useCallback, useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import GuestbookDetail from './guestbook-detail.jsx';
import GuestbookForm from './guestbook-form.jsx';
import GuestbookList from './guestbook-list.jsx';
import GuestbookSearch from './guestbook-search.jsx';
import { fetchGuestbookEntries, PAGE_SIZE } from '../../utils/guestbook-api.js';

const subTitleSx = {
  mb: 1.5,
  color: 'var(--color-text-primary)',
  fontWeight: 700,
  fontSize: { xs: '1rem', md: '1.1rem' },
};

/**
 * GuestbookBoard 컴포넌트
 *
 * Contact 섹션 안의 방명록 전체(작성 · 검색 · 목록 · 상세)를 관리합니다.
 * 새 페이지로 이동하지 않고 섹션 안에서 목록과 상세 화면을 전환합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <GuestbookBoard />
 */
function GuestbookBoard() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const boardRef = useRef(null);

  /** 응답을 요청 조건(requestKey)과 함께 저장 → 조건이 바뀌면 자동으로 로딩 중으로 판단 */
  const requestKey = `${page}|${keyword}|${reloadKey}`;
  const [response, setResponse] = useState({ key: null, entries: [], total: 0, hasError: false });

  useEffect(() => {
    let isActive = true;
    fetchGuestbookEntries({ page, keyword })
      .then(({ entries, total }) => {
        if (isActive) setResponse({ key: requestKey, entries, total, hasError: false });
      })
      .catch(() => {
        if (isActive) setResponse({ key: requestKey, entries: [], total: 0, hasError: true });
      });
    return () => { isActive = false; };
  }, [page, keyword, requestKey]);

  const listState = { ...response, isLoading: response.key !== requestKey };

  const scrollToBoard = () => {
    boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = (nextKeyword) => {
    setKeyword(nextKeyword);
    setPage(1);
  };

  const handleCreated = useCallback(() => {
    setKeyword('');
    setPage(1);
    setReloadKey((key) => key + 1);
  }, []);

  const openDetail = (id) => {
    setSelectedId(id);
    scrollToBoard();
  };

  const closeDetail = () => {
    setSelectedId(null);
    scrollToBoard();
  };

  const pageCount = Math.max(1, Math.ceil(listState.total / PAGE_SIZE));

  if (selectedId !== null) {
    return (
      <Box ref={ boardRef } sx={{ scrollMarginTop: 80 }}>
        <Box sx={ subTitleSx }>방명록</Box>
        <GuestbookDetail entryId={ selectedId } onNavigate={ openDetail } onBack={ closeDetail } />
      </Box>
    );
  }

  return (
    <Box ref={ boardRef } sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 5 }, scrollMarginTop: 80 }}>
      <Box>
        <Box sx={ subTitleSx }>방명록 남기기</Box>
        <GuestbookForm onCreated={ handleCreated } />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.5 }}>
          <Box sx={{ ...subTitleSx, mb: 0 }}>방명록</Box>
          <Box sx={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            {keyword ? `'${keyword}' 검색 결과 ${listState.total}건` : `${listState.total}건`}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <GuestbookSearch key={ keyword } initialKeyword={ keyword } onSearch={ handleSearch } />
        </Box>

        {listState.hasError && <Alert severity="error">방명록을 불러오지 못했어요.</Alert>}

        {!listState.hasError && !listState.isLoading && listState.entries.length === 0 && (
          <Box sx={{ py: 5, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            {keyword ? '검색 결과가 없어요.' : '아직 방명록이 없어요. 첫 글을 남겨 주세요.'}
          </Box>
        )}

        {listState.entries.length > 0 && (
          <Box sx={{ opacity: listState.isLoading ? 0.5 : 1, transition: 'opacity 0.15s ease' }}>
            <GuestbookList entries={ listState.entries } onSelect={ openDetail } />
          </Box>
        )}

        {pageCount > 1 && (
          <Pagination
            count={ pageCount }
            page={ page }
            onChange={ (_, value) => setPage(value) }
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              '& .Mui-selected': {
                bgcolor: 'var(--color-navy) !important',
                color: 'var(--color-on-navy)',
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default GuestbookBoard;

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

/**
 * GuestbookSearch 컴포넌트
 *
 * 작성자 · 소속 · 내용을 한 번에 검색하는 입력창입니다.
 *
 * Props:
 * @param {string} initialKeyword - 처음 표시할 검색어 [Optional, 기본값: '']
 * @param {function} onSearch - 검색 실행 시 호출 (keyword: string) [Required]
 *
 * Example usage:
 * <GuestbookSearch onSearch={ (keyword) => setKeyword(keyword) } />
 */
function GuestbookSearch({ initialKeyword = '', onSearch }) {
  const [value, setValue] = useState(initialKeyword);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  const handleReset = () => {
    setValue('');
    onSearch('');
  };

  return (
    <Box component="form" role="search" onSubmit={ handleSubmit } sx={{ display: 'flex', gap: 1 }}>
      <TextField
        value={ value }
        onChange={ (event) => setValue(event.target.value) }
        placeholder="작성자, 소속, 내용으로 검색"
        size="small"
        fullWidth
        slotProps={{
          htmlInput: { 'aria-label': '방명록 검색', maxLength: 50 },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'var(--color-bg-primary)' } }}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{
          flexShrink: 0,
          color: 'var(--color-navy)',
          borderColor: 'var(--color-navy)',
          '&:hover': { borderColor: 'var(--color-navy)' },
        }}
      >
        검색
      </Button>
      {initialKeyword && (
        <Button onClick={ handleReset } sx={{ flexShrink: 0, color: 'var(--color-text-secondary)' }}>
          전체
        </Button>
      )}
    </Box>
  );
}

export default GuestbookSearch;

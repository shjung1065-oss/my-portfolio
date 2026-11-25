import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { deleteGuestbookEntry } from '../../utils/guestbook-api.js';

/**
 * GuestbookDeleteDialog 컴포넌트
 *
 * 방명록 삭제 확인 창입니다. 작성자 비밀번호 또는 관리자 비밀번호를 입력받아 삭제합니다.
 *
 * Props:
 * @param {number} entryId - 삭제할 방명록 번호 [Required]
 * @param {boolean} isOpen - 창 열림 여부 [Required]
 * @param {function} onClose - 창을 닫을 때 호출 [Required]
 * @param {function} onDeleted - 삭제 성공 후 호출 [Required]
 *
 * Example usage:
 * <GuestbookDeleteDialog entryId={ 3 } isOpen={ isOpen } onClose={ close } onDeleted={ goToList } />
 */
function GuestbookDeleteDialog({ entryId, isOpen, onClose, onDeleted }) {
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    if (isDeleting) return;
    setPassword('');
    setErrorText('');
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || isDeleting) return;

    setIsDeleting(true);
    setErrorText('');
    try {
      const isDeleted = await deleteGuestbookEntry(entryId, password);
      if (isDeleted) {
        setPassword('');
        onDeleted();
      } else {
        setErrorText('비밀번호가 맞지 않아요.');
      }
    } catch {
      setErrorText('삭제하지 못했어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ handleClose }
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { component: 'form', onSubmit: handleSubmit } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>방명록 삭제</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="password"
          label="비밀번호"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
          fullWidth
          margin="dense"
          autoComplete="current-password"
          helperText="작성할 때 정한 비밀번호 또는 관리자 비밀번호"
        />
        {errorText && <Alert severity="error" sx={{ mt: 1 }}>{errorText}</Alert>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={ handleClose } disabled={ isDeleting } sx={{ color: 'var(--color-text-secondary)' }}>
          취소
        </Button>
        <Button type="submit" variant="contained" color="error" disableElevation disabled={ !password || isDeleting }>
          {isDeleting ? '삭제 중…' : '삭제'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuestbookDeleteDialog;

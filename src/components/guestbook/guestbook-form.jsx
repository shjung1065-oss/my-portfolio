import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { createGuestbookEntry } from '../../utils/guestbook-api.js';

const EMPTY_FORM = { name: '', email: '', affiliation: '', message: '' };
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: 'var(--color-bg-primary)' },
  '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'var(--color-navy)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-navy)' },
};

/**
 * GuestbookForm 컴포넌트
 *
 * 방명록 작성 폼입니다. 이름과 메시지는 필수, 이메일(비공개)과 소속은 선택입니다.
 *
 * Props:
 * @param {function} onCreated - 작성 성공 후 호출되는 함수 [Optional]
 *
 * Example usage:
 * <GuestbookForm onCreated={ reloadList } />
 */
function GuestbookForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const isEmailInvalid = form.email.trim() !== '' && !EMAIL_PATTERN.test(form.email.trim());
  const canSubmit = form.name.trim() && form.message.trim() && !isEmailInvalid && !isSubmitting;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await createGuestbookEntry(form);
      setForm(EMPTY_FORM);
      setFeedback({ severity: 'success', text: '방명록이 등록됐어요. 남겨 주셔서 고마워요!' });
      onCreated?.();
    } catch {
      setFeedback({ severity: 'error', text: '등록하지 못했어요. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={ handleSubmit } noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          label="이름"
          name="name"
          value={ form.name }
          onChange={ handleChange }
          required
          fullWidth
          slotProps={{ htmlInput: { maxLength: 30 } }}
          helperText="목록에는 김** 처럼 성만 보여요"
          sx={ fieldSx }
        />
        <TextField
          label="소속 / 직업"
          name="affiliation"
          value={ form.affiliation }
          onChange={ handleChange }
          fullWidth
          slotProps={{ htmlInput: { maxLength: 50 } }}
          helperText="선택 · 회사, 학교 등"
          sx={ fieldSx }
        />
      </Box>
      <TextField
        label="이메일"
        name="email"
        type="email"
        value={ form.email }
        onChange={ handleChange }
        fullWidth
        error={ isEmailInvalid }
        slotProps={{ htmlInput: { maxLength: 100 } }}
        helperText={ isEmailInvalid ? '이메일 형식을 확인해 주세요' : '선택 · 공개되지 않고 답장할 때만 사용해요' }
        sx={ fieldSx }
      />
      <TextField
        label="남기실 말"
        name="message"
        value={ form.message }
        onChange={ handleChange }
        required
        fullWidth
        multiline
        minRows={ 4 }
        slotProps={{ htmlInput: { maxLength: 1000 } }}
        helperText={ `${form.message.length} / 1000` }
        sx={ fieldSx }
      />

      {feedback && <Alert severity={ feedback.severity }>{feedback.text}</Alert>}

      <Button
        type="submit"
        variant="contained"
        disableElevation
        disabled={ !canSubmit }
        sx={{
          alignSelf: { xs: 'stretch', sm: 'flex-end' },
          px: 4,
          py: 1.25,
          bgcolor: 'var(--color-navy)',
          color: 'var(--color-on-navy)',
          fontWeight: 700,
          '&:hover': { bgcolor: 'var(--color-navy)', opacity: 0.9 },
        }}
      >
        {isSubmitting ? '등록 중…' : '방명록 남기기'}
      </Button>
    </Box>
  );
}

export default GuestbookForm;

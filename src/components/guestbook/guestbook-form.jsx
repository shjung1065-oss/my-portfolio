import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { createGuestbookEntry } from '../../utils/guestbook-api.js';

const EMPTY_FORM = { name: '', phone: '', email: '', affiliation: '', title: '', message: '', password: '' };
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_PATTERN = /^[0-9-]{9,13}$/;

const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: 'var(--color-bg-primary)' },
  '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'var(--color-navy)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-navy)' },
};

/**
 * GuestbookForm 컴포넌트
 *
 * 방명록 작성 폼입니다. 이름 · 제목 · 내용 · 비밀번호는 필수, 소속 · 전화번호 · 이메일은 선택(비공개)입니다.
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
  const isPhoneInvalid = form.phone.trim() !== '' && !PHONE_PATTERN.test(form.phone.trim());
  const isPasswordInvalid = form.password !== '' && (form.password.length < 4 || form.password.length > 20);
  const canSubmit = form.name.trim() && form.title.trim() && form.message.trim()
    && form.password && !isPasswordInvalid && !isEmailInvalid && !isPhoneInvalid && !isSubmitting;

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
          helperText="선택 · 회사, 학교 등 (비공개)"
          sx={ fieldSx }
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          label="전화번호"
          name="phone"
          type="tel"
          value={ form.phone }
          onChange={ handleChange }
          fullWidth
          error={ isPhoneInvalid }
          placeholder="010-1234-5678"
          slotProps={{ htmlInput: { maxLength: 13, inputMode: 'tel' } }}
          helperText={ isPhoneInvalid ? '숫자와 - 만 입력해 주세요' : '선택' }
          sx={ fieldSx }
        />
        <TextField
          label="이메일"
          name="email"
          type="email"
          value={ form.email }
          onChange={ handleChange }
          fullWidth
          error={ isEmailInvalid }
          slotProps={{ htmlInput: { maxLength: 100 } }}
          helperText={ isEmailInvalid ? '이메일 형식을 확인해 주세요' : '선택' }
          sx={ fieldSx }
        />
      </Box>
      <Box sx={{ mt: -1, color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>
        소속/직업, 전화번호, 이메일은 공개되지 않아요. 사이트 주인만 확인하고, 답장이 필요할 때 연락드려요.
      </Box>
      <TextField
        label="제목"
        name="title"
        value={ form.title }
        onChange={ handleChange }
        required
        fullWidth
        slotProps={{ htmlInput: { maxLength: 50 } }}
        helperText="목록에는 제목만 보여요"
        sx={ fieldSx }
      />
      <TextField
        label="내용"
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

      <TextField
        label="비밀번호"
        name="password"
        type="password"
        value={ form.password }
        onChange={ handleChange }
        required
        error={ isPasswordInvalid }
        autoComplete="new-password"
        slotProps={{ htmlInput: { maxLength: 20 } }}
        helperText={ isPasswordInvalid ? '4~20자로 입력해 주세요' : '글을 삭제할 때 필요해요 (4~20자)' }
        sx={{ ...fieldSx, maxWidth: { sm: 320 } }}
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

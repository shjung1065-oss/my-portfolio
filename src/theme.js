import { createTheme } from '@mui/material/styles';

/**
 * MUI 테마
 * - 색상은 index.css 의 CSS 변수(컬러 팔레트 디자인 시스템)를 참조합니다.
 * - palette 에는 계산용 기본 hex 값을, 실제 화면 색상은 CSS 변수로 지정해 다크모드를 자동으로 따릅니다.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#70B51F',
      light: '#A3D16A',
      dark: '#4F8A12',
    },
    secondary: {
      main: '#00703C',
    },
    text: {
      primary: '#222222',
      secondary: '#555555',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F3F3F3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-secondary)',
        },
      },
    },
  },
});

export default theme;

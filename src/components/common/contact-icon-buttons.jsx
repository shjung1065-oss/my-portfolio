import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

import { CONTACT_INFO } from '../../utils/contact-info.js';

const CONTACT_ITEMS = [
  {
    id: 'phone',
    label: '전화하기',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`,
    Icon: PhoneOutlinedIcon,
  },
  {
    id: 'email',
    label: '메일 보내기',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    Icon: MailOutlinedIcon,
  },
];

/**
 * ContactIconButtons 컴포넌트
 *
 * 누르면 바로 전화 연결(tel:) 또는 메일 앱(mailto:)이 열리는 아이콘 버튼 묶음입니다.
 *
 * Props:
 * @param {boolean} isLabeled - 아이콘 옆에 연락처 텍스트를 함께 보여줄지 여부 [Optional, 기본값: false]
 * @param {string} tone - 'light'(밝은 배경용) 또는 'dark'(남색 배경용) [Optional, 기본값: 'light']
 *
 * Example usage:
 * <ContactIconButtons isLabeled />
 */
function ContactIconButtons({ isLabeled = false, tone = 'light' }) {
  const iconColor = tone === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-navy)';

  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexDirection: isLabeled ? 'column' : 'row',
        gap: isLabeled ? 1.5 : 0.5,
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
    >
      {CONTACT_ITEMS.map(({ id, label, value, href, Icon }) => (
        <Box component="li" key={ id } sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Tooltip title={ `${label} · ${value}` }>
            <IconButton
              component="a"
              href={ href }
              aria-label={ `${label} (${value})` }
              sx={{
                width: isLabeled ? 52 : 40,
                height: isLabeled ? 52 : 40,
                color: iconColor,
                border: '1px solid',
                borderColor: tone === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'var(--color-ivory-line)',
                bgcolor: tone === 'dark' ? 'transparent' : 'var(--color-bg-primary)',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                '&:hover': {
                  bgcolor: 'var(--color-navy)',
                  color: 'var(--color-on-navy)',
                  borderColor: 'var(--color-navy)',
                },
              }}
            >
              <Icon fontSize={ isLabeled ? 'medium' : 'small' } />
            </IconButton>
          </Tooltip>

          {isLabeled && (
            <Box
              component="a"
              href={ href }
              sx={{
                color: 'var(--color-text-primary)',
                fontSize: { xs: '1rem', md: '1.05rem' },
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {value}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ContactIconButtons;

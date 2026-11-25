import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import { SNS_LINKS } from '../../utils/contact-info.js';

const SNS_ICONS = {
  github: GitHubIcon,
  instagram: InstagramIcon,
  blog: EditNoteOutlinedIcon,
};

/**
 * SnsLinks 컴포넌트
 *
 * SNS 링크를 단색 미니멀 아이콘으로 한 줄에 나열합니다. url 이 비어 있는 항목은 숨깁니다.
 *
 * Props:
 * @param {string} color - 아이콘 색상 (CSS 색상값) [Optional, 기본값: 'currentColor']
 *
 * Example usage:
 * <SnsLinks color="#FFFFFF" />
 */
function SnsLinks({ color = 'currentColor' }) {
  const visibleLinks = SNS_LINKS.filter((link) => link.url);

  if (visibleLinks.length === 0) return null;

  return (
    <Box component="ul" sx={{ display: 'flex', gap: 0.25, listStyle: 'none', m: 0, p: 0 }}>
      {visibleLinks.map(({ id, label, url }) => {
        const Icon = SNS_ICONS[id];
        return (
          <Box component="li" key={ id }>
            <IconButton
              component="a"
              href={ url }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ label }
              size="small"
              sx={{ color, opacity: 0.8, '&:hover': { opacity: 1 } }}
            >
              <Icon fontSize="small" />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
}

export default SnsLinks;

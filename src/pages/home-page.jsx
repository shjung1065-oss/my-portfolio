import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import ContactSection from '../components/contact/contact-section.jsx';
import SectionCard from '../components/ui/section-card.jsx';

const HOME_SECTIONS = [
  {
    id: 'hero',
    title: 'Hero',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    isHero: true,
  },
  {
    id: 'about',
    title: 'About Me',
    description: '여기는 About Me 섹션입니다. 간단한 자기소개와 \'더 알아보기\' 버튼이 들어갈 예정입니다.',
  },
  {
    id: 'skills',
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: '여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 \'더 보기\' 버튼이 들어갈 예정입니다.',
  },
];

const toSectionLabel = (index) => `SECTION ${String(index + 1).padStart(2, '0')}`;

/**
 * HomePage 컴포넌트
 *
 * Hero · About Me · Skill Tree · Projects · Contact 5개 섹션으로 구성된 홈 페이지입니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  const { hash } = useLocation();

  /** 푸터의 '방명록 남기기'(/#contact)처럼 해시로 들어오면 해당 섹션으로 스크롤 */
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {HOME_SECTIONS.map((section, index) => (
        <SectionCard
          key={ section.id }
          id={ section.id }
          label={ toSectionLabel(index) }
          title={ section.title }
          description={ section.description }
          isHero={ section.isHero }
        />
      ))}
      <ContactSection label={ toSectionLabel(HOME_SECTIONS.length) } />
    </Stack>
  );
}

export default HomePage;

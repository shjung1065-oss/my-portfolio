import { supabase } from '../lib/supabase.js';

/**
 * 공개 가능한 컬럼만 조회합니다. (실명 · 전화번호 · 이메일 · 소속은 DB 권한상 읽을 수 없음)
 * - 목록: 제목만 노출 / 상세: 제목 + 내용
 */
const LIST_COLUMNS = 'id, display_name, title, created_at';
const DETAIL_COLUMNS = 'id, display_name, title, message, created_at';

export const PAGE_SIZE = 10;

/** PostgREST 필터 문법을 깨뜨릴 수 있는 문자를 제거합니다. */
function sanitizeKeyword(keyword) {
  return keyword.replace(/[,()%*\\]/g, ' ').trim();
}

/**
 * 방명록 목록을 가져옵니다. 키워드가 있으면 작성자 · 제목 · 내용에서 검색합니다.
 * @param {{ page: number, keyword: string }} options
 * @returns {Promise<{ entries: Array, total: number }>}
 */
export async function fetchGuestbookEntries({ page = 1, keyword = '' }) {
  const from = (page - 1) * PAGE_SIZE;
  let query = supabase
    .from('guestbook')
    .select(LIST_COLUMNS, { count: 'exact' })
    .order('id', { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  const safeKeyword = sanitizeKeyword(keyword);
  if (safeKeyword) {
    const pattern = `%${safeKeyword}%`;
    query = query.or(`display_name.ilike.${pattern},title.ilike.${pattern},message.ilike.${pattern}`);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { entries: data, total: count ?? 0 };
}

/**
 * 방명록 한 건과 이전 · 다음 글 번호를 가져옵니다.
 * - 이전 글 = 더 오래된 글(번호가 작은 글), 다음 글 = 더 최근 글
 * @param {number} id
 */
export async function fetchGuestbookEntry(id) {
  const [current, prev, next] = await Promise.all([
    supabase.from('guestbook').select(DETAIL_COLUMNS).eq('id', id).maybeSingle(),
    supabase.from('guestbook').select('id, title').lt('id', id)
      .order('id', { ascending: false }).limit(1).maybeSingle(),
    supabase.from('guestbook').select('id, title').gt('id', id)
      .order('id', { ascending: true }).limit(1).maybeSingle(),
  ]);

  const error = current.error || prev.error || next.error;
  if (error) throw error;
  return { entry: current.data, prev: prev.data, next: next.data };
}

/**
 * 방명록을 작성합니다. (insert 후 결과를 다시 읽지 않음 → 실명 · 전화번호 · 이메일 노출 없음)
 * - 비밀번호는 DB 트리거에서 bcrypt 해시로 변환되어 저장됩니다.
 * @param {{ name: string, phone: string, email: string, affiliation: string, title: string, message: string, password: string }} form
 */
export async function createGuestbookEntry({ name, phone, email, affiliation, title, message, password }) {
  const { error } = await supabase.from('guestbook').insert({
    name: name.trim(),
    password,
    title: title.trim(),
    phone: phone.trim() || null,
    email: email.trim() || null,
    affiliation: affiliation.trim() || null,
    message: message.trim(),
  });
  if (error) throw error;
}

/**
 * 방명록을 삭제합니다. 작성자 비밀번호 또는 관리자 비밀번호가 맞아야 삭제됩니다.
 * - 비밀번호 확인과 삭제는 DB 함수(delete_guestbook_entry) 안에서만 처리됩니다.
 * @param {number} id
 * @param {string} password
 * @returns {Promise<boolean>} 삭제 성공 여부 (비밀번호 불일치 시 false)
 */
export async function deleteGuestbookEntry(id, password) {
  const { data, error } = await supabase.rpc('delete_guestbook_entry', {
    p_id: id,
    p_password: password,
  });
  if (error) throw error;
  return data === true;
}

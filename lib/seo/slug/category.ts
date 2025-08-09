import { textSlugify } from './slugGeneration';

export function decodeProductCategorySlug(slug: string[] | undefined) {
  if (!slug || !slug.length) {
    return undefined;
  }
  const code = slug[0].split('.')[1];
  return `CTG${code}`;
}

export function generateCategorySlug(name: string, code: string) {
  if (code === 'all') {
    return '';
  }
  return `${textSlugify(name)}.${code.slice(3)}`;
}

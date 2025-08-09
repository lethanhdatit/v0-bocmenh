export const enum SlugTypes {
  AFFILIATE = 'affiliate',
}

export type SlugPayload = {
  type: SlugTypes;
  ids: string[];
};

// NOTE: fixed length of 2
const SlugTypeShort = {
  [SlugTypes.AFFILIATE]: 'af'
};

export const SlugTypesMaskRevert = Object.entries(SlugTypeShort).reduce(
  (a: { [key: string]: string }, [key, val]) => {
    a[val] = key;
    return a;
  },
  {} as { [key: string]: string },
);

const SPECIAL_CHARS_REGEX = /[\s.,/\\;?:@&=%+#$|<>~'"]/g;
export const textSlugify = (text: string) => {
  return text?.trim().replace(SPECIAL_CHARS_REGEX, '-') ?? '';
};

export const encodeSlug = (title: string, { type, ids }: SlugPayload) => {
  const prefix = textSlugify(title);
  return `${prefix}.${SlugTypeShort[type]}${ids.join('.')}`;
};

export const decodeSlug = (slug: string): SlugPayload => {
  const splitSlugs = slug.split('.')?.slice(1); // exclude title part

  if (splitSlugs?.length < 1) {
    throw new Error(`invalid slug: ${slug}`);
  }

  const slugType = SlugTypesMaskRevert[splitSlugs[0].slice(0, 2)];

  if (!slugType) {
    throw new Error(`SLUG TYPE NOT EXIST!: ${slug}`);
  }

  return {
    type: slugType as SlugTypes,
    ids: [splitSlugs[0].slice(2), ...splitSlugs.slice(1)],
  };
};

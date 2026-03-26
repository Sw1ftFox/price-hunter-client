export const AddMethod = {
  ARTICLE: "article",
  LINK: 'link'
} as const;

export type AddMethodType = typeof AddMethod[keyof typeof AddMethod]

export const ADD_PRODUCT_METHODS: Record<AddMethodType, string> = {
  [AddMethod.ARTICLE]: "По артикулу",
  [AddMethod.LINK]: 'По ссылке'
}

export const TagsKind = {
  WINTER: 'winter',
  SUMMER: 'summer'
} as const;

export type TagsType = typeof TagsKind[keyof typeof TagsKind];

export const TAGS: Record<TagsType, string> = {
  [TagsKind.WINTER]: "🎄 Зимний",
  [TagsKind.SUMMER]: "☀️ Летний"
}

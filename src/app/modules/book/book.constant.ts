export const bookSearchableFields = [
    'title',
    'author',
    'genre',
  ]

  export const bookFilterableFields = [
    'searchTerm',
    'title',
    'author',
    'genre',
  ]

export const bookRelationalFields: string[] = [
    'categoryId',
];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
    categoryId: 'category',

};
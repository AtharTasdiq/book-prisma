"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = [
    'title',
    'author',
    'genre',
];
exports.bookFilterableFields = [
    'searchTerm',
    'title',
    'author',
    'genre',
];
exports.bookRelationalFields = [
    'categoryId',
];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
};

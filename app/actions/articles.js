export const ADD_ARTICLE = 'ADD_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export function addArticle(articleData) {
  return {
    type: ADD_ARTICLE,
    articleData
  };
}

export function editArticle(articleId, articleData) {
  return {
    type: EDIT_ARTICLE,
    articleId,
    articleData
  };
}

export function removeArticle(articleId) {
  return {
    type: REMOVE_ARTICLE,
    articleId,
  };
}

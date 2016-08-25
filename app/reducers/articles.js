import { ADD_ARTICLE, EDIT_ARTICLE } from '../actions/articles';

const generateId = () => Math.floor(Math.random() * 1000000);

export default function articles(state = [], action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, {
        id: generateId(),
        ...action.articleData
      }];
    case EDIT_ARTICLE:
      const index = state.findIndex(article => article.id === action.articleId);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
        {
          id: action.articleId,
          ...action.articleData
        }
      ]
    default:
      return state;
  }
}

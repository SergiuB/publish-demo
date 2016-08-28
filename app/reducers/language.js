import { CHANGE_LANGUAGE } from '../actions/language';

export default function language(state = 'en', action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
}

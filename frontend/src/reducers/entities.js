import { combineReducers } from 'redux';
import category_reducer from './category_reducer';
import QuestsReducer from './quest_reducer';
import AdventurerReducer from './adventurer_reducer';
import ReviewReducer from './review_reducer';
import TempReducer from './temp_reducer';

export default combineReducers({
  categories: category_reducer,
  adventurers: AdventurerReducer,
  quests: QuestsReducer,
  reviews: ReviewReducer,
  temp: TempReducer
});

import produce from "immer";
import * as ACTION_TYPES from "../actionTypes/control";
import { DEFAULT_COUNTRY_CONFIG, DEFAULT_LANGUAGE } from "../utils/constants";

const initialState = {
  searchValue: "",
  applicationLanguage: DEFAULT_LANGUAGE,
  isAuthorized: false,
  countryConfig: DEFAULT_COUNTRY_CONFIG,
};

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COUNTRY_CONFIG:
      return produce(state, (draft) => {
        draft.countryConfig = action.country;
      });
    case ACTION_TYPES.SET_SEARCH_VALUE:
      return produce(state, (draft) => {
        draft.searchValue = action.payload;
      });
    case ACTION_TYPES.SET_APPLICATION_LANGUAGE:
      return produce(state, (draft) => {
        draft.applicationLanguage = action.payload;
      });
    case ACTION_TYPES.SET_IS_AUTHORIZED:
      return produce(state, (draft) => {
        draft.isAuthorized = action.payload;
      });
    default:
      return state;
  }
};

export default controlReducer;

import { ACTIONS } from "./actions";

const initialState = {
  dogs: {
    dogs: [],
    page: 0,
    pages: 1
  },
  dog: {
      dog: []
  },
  temperaments: []
};

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTIONS.ADD_RACES:
      return {
        ...state,
        dogs: { ...state.dogs, dogs: [...payload.data], page: 0, pages: payload.pages },
      };
    case ACTIONS.NEXT_PAGE:
      return {
        ...state,
        dogs: { ...state.dogs, page: state.dogs.page + 1 },
      };
    case ACTIONS.PREVIOUS_PAGE:
      return {
        ...state,
        dogs: { ...state.dogs, page: state.dogs.page - 1 },
      };
    case ACTIONS.DOG_BY_ID:
      return {
        ...state,
        dog: {...state.dog, dog: [...payload]}
      }
    case ACTIONS.GO_TO_PAGE:
      return {
        ...state,
        dogs: {...state.dogs, page: payload}
      }
    case ACTIONS.ADD_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload
      }
    default:
      return state;
  }
};
export default reducer;

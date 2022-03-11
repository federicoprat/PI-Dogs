import { ACTIONS } from "./actions";

const initialState = {
  dogs: {
    dogs: [],
    page: 0,
  },
  dog: {
      dog: []
  }
};

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTIONS.ADD_RACES:
      return {
        ...state,
        dogs: { ...state.dogs, dogs: [...payload], page: 0 },
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
    default:
      return state;
  }
};
export default reducer;

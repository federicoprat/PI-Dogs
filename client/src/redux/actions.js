export const ACTIONS = {
  ADD_RACES: "addRaces",
  NEXT_PAGE: "nextPage",
  PREVIOUS_PAGE: "previousPage",
  DOG_BY_ID: "dogById",
};

export function addRaces(filter, origen, search = undefined) {
  return async function (dispatch) {
    let json;
    if (!search) {
      json = await fetch("http://localhost:3001/dogs");
    } else {
      json = await fetch(`http://localhost:3001/dogs?name=${search}`);
    }
    const data = await json.json();
    if (filter === "None") {
      if (origen === "todos")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: data,
        });
      else if (origen === "creados")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: data.filter(({ created }) => created),
        });
      else
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: data.filter(({ created }) => !created),
        });
    } else {
      if (origen === "todos")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: data.filter(({ temperament }) => {
            if (temperament) return temperament.split(", ").includes(filter);
            else return null;
          }),
        });
      else if (origen === "creados")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: data.filter(({ temperament, created }) => {
            if (temperament)
              return temperament.split(", ").includes(filter) && created;
            else return null;
          }),
        });
      else
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: data.filter(({ temperament, created }) => {
            if (temperament)
              return temperament.split(", ").includes(filter) && !created;
            else return null;
          }),
        });
    }
  };
}

export function turnPage(arg) {
  return {
    type: arg,
  };
}

export function getDogById({id}) {
  return async function (dispatch) {
    const data = await fetch(`http://localhost:3001/dogs/${id}`);
    const json = await data.json();
    dispatch({
      type: ACTIONS.DOG_BY_ID,
      payload: json,
    });
  };
}

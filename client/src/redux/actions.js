import axios from "axios";
export const ACTIONS = {
  ADD_RACES: "addRaces",
  NEXT_PAGE: "nextPage",
  PREVIOUS_PAGE: "previousPage",
  DOG_BY_ID: "dogById",
  GO_TO_PAGE: "goToPage",
  ADD_TEMPERAMENTS: "addTemperaments",
};

export function addRaces(
  filter,
  origen,
  search = undefined,
  orderBy,
  ascOrDesc
) {
  return async function (dispatch) {
    let json;
    if (!search) {
      json = await axios.get(`/dogs?orderBy=${orderBy}&ascOrDesc=${ascOrDesc}`);
    } else {
      json = await axios.get(
        `/dogs?name=${search}&orderBy=${orderBy}&ascOrDesc=${ascOrDesc}`
      );
    }
    const { data } = await json;
    if (filter === "None") {
      if (origen === "todos")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: { data, pages: Math.ceil(data.length / 8) },
        });
      else if (origen === "creados")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: {
            data: data.filter(({ created }) => created),
            pages: Math.ceil(data.filter(({ created }) => created).length / 8),
          },
        });
      else
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: {
            data: data.filter(({ created }) => !created),
            pages: Math.ceil(data.filter(({ created }) => !created).length / 8),
          },
        });
    } else {
      if (origen === "todos")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: {
            data: data.filter(({ temperament }) => {
              if (temperament)
                return temperament
                  .split(",")
                  .map((i) => i.trim())
                  .includes(filter);
              else return null;
            }),
            pages: Math.ceil(
              data.filter(({ temperament }) => {
                if (temperament)
                  return temperament
                    .split(",")
                    .map((i) => i.trim())
                    .includes(filter);
                else return null;
              }).length / 8
            ),
          },
        });
      else if (origen === "creados")
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: {
            data: data.filter(({ temperament, created }) => {
              if (temperament)
                return temperament.split(",").includes(filter) && created;
              else return null;
            }),
            pages: Math.ceil(
              data.filter(({ temperament, created }) => {
                if (temperament)
                  return temperament.split(",").includes(filter) && created;
                else return null;
              }).length / 8
            ),
          },
        });
      else
        dispatch({
          type: ACTIONS.ADD_RACES,
          payload: {
            data: data.filter(({ temperament, created }) => {
              if (temperament)
                return temperament.split(", ").includes(filter) && !created;
              else return null;
            }),
            pages: Math.ceil(
              data.filter(({ temperament, created }) => {
                if (temperament)
                  return temperament.split(", ").includes(filter) && !created;
                else return null;
              }).length / 8
            ),
          },
        });
    }
  };
}

export function turnPage(arg) {
  return {
    type: arg,
  };
}

export function getDogById({ id }) {
  return async function (dispatch) {
    const json = await axios.get(`/dogs/${id}`);
    const { data } = await json;
    dispatch({
      type: ACTIONS.DOG_BY_ID,
      payload: data,
    });
  };
}

export function goToPage(page) {
  return {
    type: ACTIONS.GO_TO_PAGE,
    payload: page,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    const json = await axios.get("/temperament");
    const { data } = await json;
    dispatch({
      type: ACTIONS.ADD_TEMPERAMENTS,
      payload: data,
    });
  };
}

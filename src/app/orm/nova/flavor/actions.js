import { combineURL, getToken, ormItems } from 'app/commons/common';

//
const getFlavorsSuccess = (flavors) => {
  let [items, itemsById] = flavors;
  return {
    type: 'GET_FLAVORS_SUCCESS',
    items,
    itemsById,
  }
};

const getFlavorsRequest = () => ({
  type: 'GET_FLAVORS_REQUEST'
});

const getFlavors = () => {
  return (dispatch) => {
    getFlavorsRequest();
    let scopedToken = getToken();
    let url = combineURL('getFlavors');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getFlavorsSuccess(ormItems(resBody.flavors)));
      }).catch(err => {
        throw err;
      }).catch(err => {
        throw err;
      })
    })
  }
};

export { getFlavors };
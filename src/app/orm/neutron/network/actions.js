import { combineURL, getToken, ormItems } from 'app/commons/common';

const getNetworksSuccess = (networks) => {
  let [items, itemsById] = networks;
  return {
    type: 'GET_NETWORKS_SUCCESS',
    items,
    itemsById
  }
};

const getNetworksRequest = () => ({
  type: 'GET_NETWORKS_REQUEST',
});

const getNetworks = () => {
  return (dispatch) => {
    dispatch(getNetworksRequest());
    let scopedToken = getToken();
    let url = combineURL('getNetworks');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getNetworksSuccess(ormItems(resBody.networks)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {

    })
  }
};

export { getNetworks };

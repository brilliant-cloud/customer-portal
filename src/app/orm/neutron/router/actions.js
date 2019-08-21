import { getToken, combineURL, ormItems } from 'app/commons/common';

const getRoutersSuccess = (routers) => {
  let [items, itemsById] = routers;
  return {
    type: 'GET_ROUTERS_SUCCESS',
    items,
    itemsById
  }
};

const getRoutersRequest = () => ({
  type: 'GET_ROUTERS_REQUEST'
});

const getRouters = () => {
  return (dispatch) => {
    dispatch(getRoutersRequest());
    let scopedToken = getToken();
    let url = combineURL('getRouters');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getRoutersSuccess(ormItems(resBody.routers)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const getRouterSuccess = (router) => ({
  type: 'GET_ROUTER_SUCCESS',
  router
});

const getRouterRequest = () => ({
  type: 'GET_ROUTER_REQUEST'
});

const getRouter = (routerId) => {
  return (dispatch) => {
    dispatch(getRouterRequest());
    let scopedToken = getToken();
    let tmpl = {'router_id': routerId};
    let url = combineURL('getRouter', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getRouterSuccess(resBody.router))
      })
    })
  }
};

export { getRouters, getRouter };
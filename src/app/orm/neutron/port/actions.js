import { getToken, combineURL, ormItems } from 'app/commons/common';

const getPortsSuccess = (ports) => {
  let [items, itemsById] = ports;
  return {
    type: 'GET_PORTS_SUCCESS',
    items,
    itemsById
  }
};

const getPortsRequest = () => ({
  type: 'GET_PORTS_REQUEST',
});

const getPorts = () => {
  return (dispatch) => {
    dispatch(getPortsRequest());
    let scopedToken = getToken();
    let url = combineURL('getPorts');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getPortsSuccess(ormItems(resBody.ports)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const getRouterPortsSuccess = (ports) => {
  let [items, itemsById] = ports;
  return {
    type: 'GET_ROUTER_PORTS_SUCCESS',
    items,
    itemsById,
  }
};

const getRouterPortsRequest = () => ({
  type: 'GET_ROUTER_PORTS_REQUEST'
});

const getRouterPorts = (routerID) => {
  return (dispatch) => {
    dispatch(getRouterPortsRequest());
    let scopedToken = getToken();
    let tmpl = {'router_id': routerID};
    let url = combineURL('getRouterPorts', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getRouterPortsSuccess(ormItems(resBody.ports)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const getRouterInterfacePortsSuccess = (ports) => {
  let [items, itemsById] = ports;
  return {
    type: 'GET_ROUTER_INTERFACE_PORTS_SUCCESS',
    items,
    itemsById
  }
};

const getRouterInterfacePortsRequest = () => ({
  type: 'GET_ROUTER_INTERFACE_PORTS_REQUEST'
});

const getRouterInterfacePorts = (routerID) => {
  return (dispatch) => {
    dispatch(getRouterInterfacePortsRequest());
    let scopedToken = getToken();
    let tmpl = {'router_id': routerID};
    let url = combineURL('getRouterInterfacePorts', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getRouterInterfacePortsSuccess(ormItems(resBody.ports)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

export { getPorts, getRouterPorts, getRouterInterfacePorts };
import { combineURL, getToken, ormItems } from 'app/commons/common';

const getServersSuccess = (servers) => {
  let [items, itemsById] = servers;
  return {
    type: 'GET_SERVERS_SUCCESS',
    items,
    itemsById
  }
};

const getServersRequest = () => {
  return {
    type: 'GET_SERVERS_REQUEST'
  }
};

const getServers = () => {
  return (dispatch) => {
    dispatch(getServersRequest());
    let scopedToken = getToken();
    let url = combineURL('getServers');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json',
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getServersSuccess(ormItems(resBody.servers)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

//
const getServerSuccess = (server) => {
  return {
    type: 'GET_SERVER_SUCCESS',
    server
  }
};

const getServerRequest = () => {
  return {
    type: 'GET_SERVER_REQUEST'
  }
};

const getServer = (serverID) => {
  return (dispatch) => {
    dispatch(getServerRequest());

    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('getServer', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getServerSuccess(resBody.server));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err
    })
  }
};

//
const pollServerSuccess = (server) => {
  return {
    type: 'POLL_SERVER_INFO_SUCCESS',
    server,
  }
};

const pollServer = (serverID) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('getServer', tmpl);
    let intervalID = setInterval(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Auth-Token': scopedToken
        }
      }).then(res => {
        res.json().then(resBody => {
          dispatch(pollServerSuccess(resBody.server));
          if (['ACTIVE', 'ERROR'].indexOf(resBody.server.status) !== -1) {
            clearInterval(intervalID);
          }
        }).catch(err => {
          clearInterval(intervalID);
          throw err;
        })
      }).catch(err => {
        clearInterval(intervalID);
        throw err;
      })
    }, 3000);
  }
};

//
const createServerSuccess = (server) => {
  let notification = {
    'action': 'creating server',
    'id': server.id,
    'payload': server,
    'willChange': true
  };

  return {
    type: 'CREATE_SERVER_SUCCESS',
    notification,
    server,
  }
};

const createServerRequest = () => {
  return {
    type: 'CREATE_SERVER_REQUEST'
  }
};

const createServer = (serverBody) => {
  let securityGroups = [];
  serverBody.choosedSecurityGroup.forEach(item => {
    securityGroups.push({
      "name": item,
    })
  });

  let networks = [];
  serverBody.choosedNetworks.forEach(item => {
    networks.push({
      "uuid": item,
    })
  });

  let server = {
    "name": serverBody.filledInstance,
    "imageRef": serverBody.choosedImage,
    "flavorRef": serverBody.choosedFlavor,
    "networks": networks
  };

  if (serverBody.choosedKeypair) {
    server["key_name"] = serverBody.choosedKeypair;
  }

  if (securityGroups) {
    server["security_groups"] = securityGroups;
  }

  let reqBody = {
    server,
  };

  return (dispatch) => {
    dispatch(createServerRequest());
    let scopedToken = getToken();
    let url = combineURL('createServer');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json().then(resBody => {
        let createServer = {
          ...resBody.server,
          'name': server.name,
          'image': {'id': server.imageRef},
          'flavor': {'id': server.flavorRef},
        };


        dispatch(createServerSuccess(createServer));
        dispatch(pollServer(resBody.server.id));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const fetchConsoleOutputSuccess = (output) => {
  return {
    type: 'FETCH_CONSOLE_OUTPUT_SUCCESS',
    output,
  }
};

const fetchConsoleOutputRequest = () => {
  return {
    type: 'FETCH_CONSOLE_OUTPUT_REQUEST',
  }
};

const fetchConsoleOutput = (serverID) => {
  return (dispatch) => {
    dispatch(fetchConsoleOutputRequest());

    let reqBody = {
      "os-getConsoleOutput": {
        "length": 50
      }
    };

    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('operateServer', tmpl);
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    }).then(res => {
      res.json().then(resBody => {
        dispatch(fetchConsoleOutputSuccess(resBody.output));
      })
    })
  }
};

// 云主机操作
const operateServerSuccess = () => {
  return {
    type: 'OPERATE_STOP_SERVER_SUCCESS',
  }
};

const operateServer = (type, serversID) => {
  return (dispatch) => {
    Promise.all(serversID.map(serverID => {
      let reqBody = {};
      if (type === 'start') {
        reqBody = {
          'os-start': null
        }
      } else if (type === 'stop') {
        reqBody = {
          'os-stop': null
        }
      }

      let scopedToken = getToken();
      let tmpl = {'server_id': serverID};
      let url = combineURL('operateServer', tmpl);
      return fetch(url, {
        method: 'POST',
        headers: {
          'X-Auth-Token': scopedToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      }).then(res => {
        if (res.status === 202) {
          dispatch(operateServerSuccess());
          dispatch(pollOperateServer(type, serverID));
        }
      })
    }))
  }
};

// 轮询云主机详细信息
const pollOperateServerSuccess = (server) => {
  return {
    type: 'POLL_OPERATE_SERVER_SUCCESS',
    server
  }
};

const pollOperateServer = (type, serverID) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('getServer', tmpl);
    let intervalID = setInterval(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Auth-Token': scopedToken
        }
      }).then(res => {
        res.json().then(resBody => {
          dispatch(pollOperateServerSuccess(resBody.server));
          if (type === 'start' && resBody.server.status === 'ACTIVE') {
            clearInterval(intervalID);
          } else if (type === 'stop' && resBody.server.status === 'SHUTOFF') {
            clearInterval(intervalID);
          }
        }).catch(err => {
          clearInterval(intervalID);
          throw err;
        })
      }).catch(err => {
        clearInterval(intervalID);
        throw err;
      })
    }, 2000)
  }
};

const updateServerRequest = () => {
  return {
    type: 'UPDATE_SERVER_REQUEST',
  }
};

const updateServerSuccess = (server) => {
  return {
    type: 'UPDATE_SERVER_SUCCESS',
    server
  }
};

const updateServer = (reqBody, selectedServer) => {
  return (dispatch) => {
    dispatch(updateServerRequest());
    let scopedToken = getToken();
    let tmpl = {'server_id': selectedServer.id};
    let url = combineURL('updateServer', tmpl);
    fetch(url, {
      method: 'PUT',
      headers: {
        'X-Auth-Token': scopedToken
      },
      body: JSON.stringify(reqBody)
    }).then(res => {
      res.json().then(resBody => {
        dispatch(updateServerSuccess(resBody.server));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const destroyServerRequest = () => {

}
const destroyServer = (selectedServer) => {

};

export {
  getServers,
  getServer,
  createServer,
  fetchConsoleOutput,
  operateServer,
  updateServer,
};
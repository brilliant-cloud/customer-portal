import { parseURLPrefix, combineIdentityURL } from 'app/commons/common';


//
const loginRequest = () => {
  return {
    type: 'LOGIN_REQUEST'
  }
};

const loginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS',
  }
};

const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE'
  }
};


//
const logoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST'
  }
};

const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  }
};

const logoutFailure = () => {
  return {
    type: 'LOGOUT_FAILURE'
  }
};


//
const loadTokenDataRequest = () => {
  return {
    type: 'LOAD_TOKEN_DATA_REQUEST'
  }
};

const loadTokenDataSuccess = () => {
  return {
    type: 'LOAD_TOKEN_DATA_SUCCESS'
  }
};

const loadTokenDataFailure = () => {
  return {
    type: 'LOAD_TOKEN_DATA_FAILURE'
  }
};


// 
const login = (values) => {
  return (dispatch) => {
    fetchUnscopedToken(dispatch, values);
  }
};

// 获取临时Token
const fetchUnscopedToken = (dispatch, values) => {
    const auth = {
      "auth": {
        "identity": {
          "methods": [
            "password"
          ],
          "password": {
            "user": {
              "name": values.username,
              "domain": {
                "name": "Default"
              },
              "password": values.password
            }
          }
        }
      }
    };

    const tokenURL = combineIdentityURL('fetchToken');
    fetch(tokenURL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      getOwnProjects(dispatch, res);
    }).catch((err) => {
      console.log(err);
    })
};

// 获取用户所属的所有project
const getOwnProjects = (dispatch, res) => {
  res.json().then((resBody) => {
    const userId = resBody.token.user.id;
    const tmpl = {'user_id': userId};
    const unscopedToken = res.headers.get('X-Subject-Token');
    let projectURL = combineIdentityURL('getOwnProjects', tmpl);

    fetch(projectURL, {
      headers: {
        "X-Auth-Token": unscopedToken
      }
    }).then((res) => {
      fetchScopedToken(dispatch, res, unscopedToken);
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
};

//
const fetchScopedToken = (dispatch, res, unscopedToken) => {
  res.json().then((resBody) => {
    const auth = {
      "auth": {
        "identity": {
          "methods": [
            "token"
          ],
          "token": {
            "id": unscopedToken
          }
        },
        "scope": {
          "project": {
            "id": resBody.projects[0].id
          }
        }
      }
    };

    const tokenURL = combineIdentityURL('fetchToken');
    fetch(tokenURL, {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      res.json().then((resBody) => {
        let urlPrefix = parseURLPrefix(resBody);
        localStorage.setItem('urlPrefix', JSON.stringify(urlPrefix));
        localStorage.setItem('projectID', resBody.token.project.id);
        localStorage.setItem('scopedToken', res.headers.get('X-Subject-Token'));
        localStorage.setItem('expires_at', resBody.token.expires_at);
        dispatch(loginSuccess());
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
};

//
const loadTokenData = (token) => {
  return (dispatch) => {
    dispatch(loadTokenDataRequest());
    const tokenURL = combineIdentityURL('getTokenData');
    fetch(tokenURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': token,
        'X-Subject-Token': token
      }
    }).then((res) => {
      res.json().then((resBody) => {
        let urlPrefix = parseURLPrefix(resBody);
        localStorage.setItem('urlPrefix', JSON.stringify(urlPrefix));
        localStorage.setItem('projectID', resBody.token.project.id);
        dispatch(loadTokenDataSuccess());
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};


//
const logout = (token) => {
  return (dispatch) => {
    dispatch(logoutRequest());
    const tokenURL = combineIdentityURL('deleteToken');
    fetch(tokenURL, {
      method: 'DELETE',
      headers: {
        'X-Auth-Token': token,
        'X-Subject-Token': token
      }
    }).then(() => {
      //localStorage.removeItem('scopedToken');
      dispatch(logoutSuccess());
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { login, loadTokenData, logout };

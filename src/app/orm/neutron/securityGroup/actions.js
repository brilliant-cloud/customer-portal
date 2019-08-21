import { combineURL, getToken, ormItems } from 'app/commons/common';

const getSecurityGroupsSuccess = (securityGroups) => {
  let [items, itemsById] = securityGroups;
  return {
    type: 'GET_SECURITY_GROUPS_SUCCESS',
    items,
    itemsById,
  }
};

const getSecurityGroupsRequest = () => {
  return {
    type: 'GET_SECURITY_GROUPS_REQUEST'
  }
};

const getSecurityGroups = () => {
  return (dispatch) => {
    dispatch(getSecurityGroupsRequest());
    let scopedToken = getToken();
    let projectID = localStorage.getItem('projectID');
    let tmpl = {'project_id': projectID};
    let url = combineURL('getSecurityGroups', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getSecurityGroupsSuccess(ormItems(resBody.security_groups)));
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getSecurityGroups };
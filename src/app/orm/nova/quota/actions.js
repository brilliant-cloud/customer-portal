import { combineURL } from 'app/commons/common';

const getProjectQuotaRequest = () => {
  return {
    type: 'GET_PROJECT_QUOTA_REQUEST',
  }
};

const getProjectQuotaSuccess = (quotaSet) => {
  return {
    type: 'GET_PROJECT_QUOTA_SUCCESS',
    quotaSet
  }
};

const getProjectQuota = () => {
  return (dispatch) => {
    dispatch(getProjectQuotaRequest());
    let scopedToken = localStorage.getItem('scopedToken');
    let projectID = localStorage.getItem('projectID');
    let tmpl = {'project_id': projectID};
    let url = combineURL('getProjectQuota', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getProjectQuotaSuccess(resBody.quota_set));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getProjectQuota };


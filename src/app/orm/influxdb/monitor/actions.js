import { combineURL, getToken, getQueryStatement } from 'app/commons/common';

const getMonitor = (serverID, timeSpan, timeStep) => {
  return (dispatch) => {
    getMonVcpuCoreUsage(dispatch, serverID, timeSpan, timeStep);
    getMonVcpuTotalUsage(dispatch, serverID, timeSpan, timeStep);
    getMonVmemUsage(dispatch, serverID, timeSpan, timeStep);
  };
};

// 虚拟机各vCPU核的使用率
const getMonVcpuCoreUsageSuccess = (data) => {
  return {
    type: 'GET_MON_VCPU_CORE_USAGE_SUCCESS',
    data,
  }
};

const getMonVcpuCoreUsageRequest = () => {
  return {
    type: 'GET_MON_VCPU_CORE_USAGE_REQUEST'
  }
};

const getMonVcpuCoreUsage = (dispatch, serverID, timeSpan, timeStep) => {

    dispatch(getMonVcpuCoreUsageRequest());

    let url = combineURL('getMonVcpuCoreUsage') +
      getQueryStatement(serverID, timeSpan, timeStep).monVcpuCoreUsage;

    // setInterval(() => {
      fetch(url, {
        method: 'GET',
      }).then(res => {
        res.json().then(resBody => {
          dispatch(getMonVcpuCoreUsageSuccess(resBody.results));
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      });
    // }, 3000)
};

// 虚拟机CPU核总的使用率
const getMonVcpuTotalUsageSuccess = (data) => {
  return {
    type: 'GET_MON_VCPU_TOTAL_USAGE_SUCCESS',
    data,
  }
};

const getMonVcpuTotalUsageRequest = () => {
  return {
    type: 'GET_MON_VCPU_TOTAL_USAGE_REQUEST',
  }
};

const getMonVcpuTotalUsage = (dispatch, serverID, timeSpan, timeStep) => {

  dispatch(getMonVcpuTotalUsageRequest());

  let url = combineURL('getMonVcpuTotalUsage') +
    getQueryStatement(serverID, timeSpan, timeStep).monVcpuTotalUsage;

  fetch(url, {
    method: 'GET'
  }).then(res => {
    res.json().then(resBody => {
      dispatch(getMonVcpuTotalUsageSuccess(resBody.results));
    })
  })
};

// 内存使用率
const getMonVmemUsageSuccess = (data) => {
  return {
    type: 'GET_MON_VMEM_USAGE_SUCCESS',
    data,
  }
};

const getMonVmemUsageRequest = () => {
  return {
    type: 'GET_MON_VMEM_USAGE_REQUEST'
  }
};

const getMonVmemUsage = (dispatch, serverID, timeSpan, timeStep) => {
  dispatch(getMonVmemUsageRequest());

  let url = combineURL('getMonVmemUsage') +
    getQueryStatement(serverID, timeSpan, timeStep).monVmemUsage;

  fetch(url, {
    method: 'GET'
  }).then(res => {
    res.json().then(resBody => {
      dispatch(getMonVmemUsageSuccess(resBody.results));
    })
  })
};

export { getMonitor }
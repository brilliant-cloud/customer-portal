import { combineURL, getToken, ormItems } from 'app/commons/common';

// 获取特定硬盘的详细信息
const getVolumeSuccess = (volume) => {
  return {
    type: 'GET_VOLUME_SUCCESS',
    volume
  }
};

const getVolume = (volume) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'volume_id': volume.id};
    let url = combineURL('getVolume', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getVolumeSuccess(resBody.volume));
      })
    })
  }
};



// 获取所有硬盘的详细信息
const getVolumesSuccess = (volumes) => {
  let [items, itemsById] = volumes;
  return {
    type: 'GET_VOLUMES_SUCCESS',
    items,
    itemsById,
  }
};

const getVolumesRequest = () => {
  return {
    type: 'GET_VOLUMES_REQUEST'
  }
};

const getVolumes = () => {
  return (dispatch) => {
    dispatch(getVolumesRequest());
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('getVolumes');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getVolumesSuccess(ormItems(resBody.volumes)));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};



//
const pollVolumeSuccess = (volume) => {
  return {
    type: 'POLL_VOLUME_SUCCESS',
    volume
  }
};

const pollVolume = (volumeID) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'volume_id': volumeID};
    let url = combineURL('getVolume', tmpl);
    let intervalID = setInterval(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Auth-Token': scopedToken
        }
      }).then((res) => {
        res.json().then((resBody) => {
          dispatch(pollVolumeSuccess(resBody.volume));
          if (resBody.volume.status === 'available') {
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
    }, 2000);
  }
};



// 创建硬盘
const createVolumeSuccess = (volume) => {
  return {
    type: 'CREATE_VOLUME_SUCCESS',
    volume
  }
};

const createVolume = (reqBody) => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('createVolume');
    reqBody = {
      'volume': reqBody
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(createVolumeSuccess(resBody.volume));
        dispatch(pollVolume(resBody.volume.id, 0));
      })
    })
  }
};



// 更新硬盘的信息
const updateVolumeSuccess = (volume) => {
  return {
    type: 'UPDATE_VOLUME_SUCCESS',
    volume,
  }
};

const updateVolume = (reqBody, selectedVolume) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'volume_id': selectedVolume.id};
    let url = combineURL('updateVolume', tmpl);
    reqBody = {
      'volume': reqBody
    };
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(reqBody),
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(updateVolumeSuccess(resBody.volume));
        // dispatch(pollVolume(selectedVolume.volumeID));
      })
    })
  }
};



// 扩充硬盘容量
const resizeVolumeSuccess = () => {
  return {
    type: 'RESIZE_VOLUME_SUCCESS',
  }
};

const resizeVolume = (reqBody, selectedVolume) => {
  console.log(reqBody, selectedVolume);
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'volume_id': selectedVolume.id};
    let url = combineURL('operateVolume', tmpl);
    reqBody = {
      'os-extend': reqBody
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.status === 202) {
        dispatch(resizeVolumeSuccess());
        dispatch(pollVolume(selectedVolume.id));
      }
    }).catch((err) => {
      throw err;
    })
  }
};



// 删除硬盘
const deleteVolumeSuccess = () => {
  return {
    type: 'DELETE_VOLUME_SUCCESS',
  }
};

const deleteVolume = (selectedVolumes) => {
  return (dispatch) => {
    Promise.all(selectedVolumes.map((ele) => {
      let scopedToken = getToken();
      let tmpl = {'volume_id': ele.id};
      let url = combineURL('deleteVolume', tmpl);
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': scopedToken
        }
      })
    })).then(res => {
      res.forEach(item => {
        if (item.status === 202) {
          dispatch(deleteVolumeSuccess());
          dispatch(pollVolumeIfDeleted(item));
        }
      })
    }).catch(err => {
      throw err
    })
  }
};



// 轮询硬盘的删除状态
const pollVolumeIfDeletedSuccess = (volume) => {
  return {
    type: 'POLL_VOLUME_IF_DELETED_SUCCESS',
    volume
  }
};

const pollVolumeIfDeletedFailure = (volume) => {
  return {
    type: 'POLL_VOLUME_IF_DELETED_FAILURE',
    volume
  }
};

const pollVolumeIfDeleted = (volume) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let url = combineURL('getVolumes');
    let intervalID = setInterval(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Auth-Token': scopedToken
        }
      }).then((res) => {
        res.json().then((resBody) => {
          let found = false;
          resBody.volumes.forEach(item => {
            if (volume.id === item.id) {
              found = true;
              if (item.status === 'error_deleting') {
                dispatch(pollVolumeIfDeletedFailure(item));
                clearInterval(intervalID);
              } else {
                dispatch(getVolumeSuccess(item));
              }
            }
          });
          if (!found) {
            dispatch(pollVolumeIfDeletedSuccess(volume));
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



export {
  getVolumes,
  createVolume,
  updateVolume,
  resizeVolume,
  deleteVolume
};

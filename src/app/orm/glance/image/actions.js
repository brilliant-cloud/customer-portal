import { combineURL, ormItems } from 'app/commons/common';

const getImagesSuccess = (images) => {
  let [items, itemsById] = images;
  return {
    type: 'GET_IMAGES_SUCCESS',
    items,
    itemsById,
  }
};

const getImagesRequest = () => {
  return {
    type: 'GET_IMAGES_REQUEST',
  }
};

const getImages = () => {
  return (dispatch) => {
    dispatch(getImagesRequest());
    let scopedToken = localStorage.getItem('scopedToken');
    let getImagesURL = combineURL('getImages');
    fetch(getImagesURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getImagesSuccess(ormItems(resBody.images)));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getImages };
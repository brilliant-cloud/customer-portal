import { combineURL, ormItems } from 'app/commons/common';

const getKeypairsSuccess = (keypairs) => {
  let [items, itemsById] = keypairs;
  return {
    type: 'GET_KEYPAIRS_SUCCESS',
    items,
    itemsById,
  }
};

const getKeypairsRequest = () => ({
  type: 'GET_KEYPAIRS_REQUEST',
});

const getKeypairs = () => {
  return (dispatch) => {
    dispatch(getKeypairsRequest());
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('getKeypairs');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        let newKeypairs = [];
        resBody.keypairs.forEach(item => {
          newKeypairs.push(item.keypair);
        });
        dispatch(getKeypairsSuccess(ormItems(newKeypairs, 'name')));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getKeypairs };
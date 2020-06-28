import { MYCENTER_LOGIN } from './action';

const initialState = {
  isLogin: false,
};

function mycenterReducer(state = initialState, action) {
  switch (action.type) {
    case MYCENTER_LOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}

export default mycenterReducer;

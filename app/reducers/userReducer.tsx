const initialState = {
  userData: {},
};

function userReducer(state = initialState, action:any) {  
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: 'lala',
      };
    default:
      return state; 
  }
}

export default userReducer;

const intitalState = {
    user: null,
    isAuthenticated:false,
    toVerifyEmail:null,
    auction:null
  };

  const userReducer = (state = intitalState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          isAuthenticated : true
        };
      case "CLEAR_USER":
        return {
          ...state,
          user: null,
          isAuthenticated : false
        };
      case "SET_TO_VERIFY":
        return {
          ...state,
          toVerifyEmail:action.payload
        }
      case "SET_AUCTION":
        return {
            ...state,
            auction:action.payload
        }
      case "CLEAR_AUCTION":
        return{
            ...state,
            auction:null
        }
  
      default:
        return state;
    }
  };
  
  export default userReducer;
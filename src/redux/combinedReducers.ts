import loginReducer from "./reducer/login";
import registerReducer from "./reducer/register";

const combinedReducers = {
  login: loginReducer,
  register: registerReducer,
};

export default combinedReducers;

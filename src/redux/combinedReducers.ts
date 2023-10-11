import loginReducer from "./reducer/login";
import registerReducer from "./reducer/register";
import documentReducer from "./reducer/document";

const combinedReducers = {
  login: loginReducer,
  register: registerReducer,
  documents: documentReducer,
};

export default combinedReducers;

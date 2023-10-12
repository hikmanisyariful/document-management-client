import loginReducer from "./reducer/login";
import registerReducer from "./reducer/register";
import documentReducer from "./reducer/document";
import detailDocumentReducer from "./reducer/detailDocument";
import profileReducer from "./reducer/profile";

const combinedReducers = {
  login: loginReducer,
  register: registerReducer,
  documents: documentReducer,
  detailDocument: detailDocumentReducer,
  profile: profileReducer,
};

export default combinedReducers;

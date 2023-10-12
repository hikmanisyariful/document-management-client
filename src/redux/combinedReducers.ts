import loginReducer from "./reducer/login";
import registerReducer from "./reducer/register";
import documentReducer from "./reducer/document";
import detailDocumentReducer from "./reducer/detailDocument";

const combinedReducers = {
  login: loginReducer,
  register: registerReducer,
  documents: documentReducer,
  detailDocument: detailDocumentReducer,
};

export default combinedReducers;

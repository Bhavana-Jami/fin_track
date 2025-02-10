import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // ✅ Corrected import (no curly braces)
import { rootReducer } from "./rootReducer";

// Create store with middleware
const store = createStore(
    rootReducer, // ✅ Use single reducer directly
    applyMiddleware(thunk)
);

export default store;

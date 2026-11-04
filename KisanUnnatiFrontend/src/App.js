import React from "react";
import { Route, Routes } from "react-router-dom";
import MyRoutes from "./Routess/MyRoutes";

const App = () => {

  return(
    <>
        
       <Routes>
        <Route path="*" element={<MyRoutes />}/>

        </Routes>
    </>
  );
}

export default App;
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    // useNavigate  =useHistory
    Navigate        // = Redirect
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <Routes>     
                <Route path="/home" render={() => {
                    return localStorage.getItem("accessToken") ? <Layout/> : <Navigate to="/" /> 
                }}>                    
                </Route>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}


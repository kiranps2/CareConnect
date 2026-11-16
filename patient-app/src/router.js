import {
    createBrowserRouter
} from "react-router-dom";

import App from "./App";

import Home
    from "./pages/Home";

import DoctorList
    from "./pages/DoctorList";

import Register
    from "./pages/Register";

import Login
    from "./pages/Login";


const router =
    createBrowserRouter([

        {
            path: "",

            element: <App />,

            children: [

                {
                    path: "",
                    element: <Home />
                },

                {
                    path: "doctors",
                    element: <DoctorList />
                },

                {
                    path: "register",
                    element: <Register />
                },

                {
                    path: "login",
                    element: <Login />
                }

            ]
        }

    ]);


export default router;
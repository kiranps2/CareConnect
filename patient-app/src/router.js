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

import DoctorDetails
    from "./pages/DoctorDetails";
import Appointments
    from "./pages/Appointments";   
import CheckAuth
    from "./auth/checkAuth";  
import BookAppointment
    from "./pages/BookAppointment";       
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
                },
                {
                    path: "doctors/:id",
                    element: <DoctorDetails />
                },
                {
                   path: "appointments",

                    element: (
                        <CheckAuth>
                            <Appointments />
                        </CheckAuth>
                    )
                },
                {
                    path: "appointments/book",

                    element: (
                        <CheckAuth>
                            <BookAppointment />
                        </CheckAuth>
                    )
                }

            ]
        }

    ]);


export default router;
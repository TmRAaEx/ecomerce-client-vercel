import "./App.css";
import {RouterProvider} from "react-router";
import {router} from "./Router.tsx";
import {HelmetProvider} from "react-helmet-async"

export default function App() {
    return (
        <div className="App">
            <HelmetProvider>
                <RouterProvider router={router}></RouterProvider>
            </HelmetProvider>
        </div>
    );
}

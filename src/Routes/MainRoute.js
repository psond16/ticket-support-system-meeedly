import {Routes, Route} from "react-router-dom";
import Home from "../View/Home/Home";
import Settings from "../View/Settings/Settings";
import About from "../View/About/About";
import Error404 from "../View/Error404/Error404";

export default function MainRoute(){
    return(
        <>
            <Routes>
                <Route
                    path = "/*"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<Home />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                />
            </Routes>

            <Routes>
                <Route
                    path = "/about/"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<About />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                />
            </Routes>

            <Routes>
                <Route
                    path = "/settings/"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<Settings />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                />
            </Routes>
        </>
    )
}
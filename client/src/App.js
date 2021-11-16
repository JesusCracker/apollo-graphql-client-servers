import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login'
import Register from "./pages/Register";
import 'semantic-ui-css/semantic.min.css'
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import { React, Fragment } from "react";
import { PrivateOutlet } from "./utils/AuthRoute";


function NotFound() {
    return (
        <div>
            <h1>Not found!</h1>
            <p>Sorry your page was not found!</p>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Container>
                    <MenuBar/>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route  path="/" element={<PrivateOutlet />}>
                            <Route exact path="/" element={<Home/>}/>
                        </Route>
                        <Route exact path={'/login'} element={<Login/>}/>
                        <Route exact path={'/register'} element={<Register/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

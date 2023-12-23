import { Outlet,Link,useNavigate } from "react-router-dom";
import '../css/layout.css';

/*
Here it is just an unneccessary component according to logic I written.
Orginally it is used for navigation and it stays fixed at the top of the page which I don't want in this application.
*/

function Layout() {

    const navigate = useNavigate();

    return(
        <>
            <nav>
                <Link to='/oms' id="oms">Home</Link>
               {/*  <Link to='/login' id="login">/Login</Link>
                <Link to='/register' id="register">Register</Link>*/}
            </nav>
            <Outlet/>
        </>
    )
};

export default Layout;
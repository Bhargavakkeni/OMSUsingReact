import { Outlet,Link,useNavigate } from "react-router-dom";

import '../css/layout.css';

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
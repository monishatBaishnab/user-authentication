import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Root = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-5 md:px-10">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;
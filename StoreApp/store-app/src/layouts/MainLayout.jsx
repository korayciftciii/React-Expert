import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <NavBar />
            <Container maxWidth="lg" sx={{ my: 2 }}>
                <Outlet />
            </Container>


        </>
    )
}
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";

export default function MainLayout() {
    return (
        <>

            <NavBar />
            <Container maxWidth="lg" sx={{ my: 2 }}>
                <Outlet />
            </Container>


        </>
    )
}
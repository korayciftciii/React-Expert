import { Box, Typography, Alert, AlertTitle, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useLocation } from "react-router";

export default function ServerErrorPage() {
    const { state } = useLocation();
    console.log(state);
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9f9f9",
                px: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    textAlign: "center",
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 4,
                    backgroundColor: "#fff",
                }}
            >
                {
                    state?.error ? (<Alert
                        icon={<ErrorOutlineIcon fontSize="inherit" />}
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        <AlertTitle sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
                            500 - Internal Server Error
                        </AlertTitle>
                        {state.error.message} - {state.error.details}
                    </Alert>) : (
                        <Alert
                            icon={<ErrorOutlineIcon fontSize="inherit" />}
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            <AlertTitle sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
                                500 - Internal Server Error
                            </AlertTitle>
                            Something went wrong on the server side. Please try again later.
                        </Alert>
                    )
                }
                <Button
                    component={Link}
                    to='/'
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                >
                    Home
                </Button>
            </Box>
        </Box>
    );
}

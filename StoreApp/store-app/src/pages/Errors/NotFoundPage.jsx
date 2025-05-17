import { Box, Typography, Alert, AlertTitle, Button } from "@mui/material";
import { Link, useLocation } from "react-router"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export default function NotFoundPage() {
    const { state } = useLocation();

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
                            404 - Not Found
                        </AlertTitle>
                        <Typography>
                            {state.error.message} {state?.error.details ? ("-" + "  " + state.error.details) : ("- The page which is you searched couldn't find.")}
                        </Typography>
                    </Alert>) : (
                        <Alert
                            icon={<ErrorOutlineIcon fontSize="inherit" />}
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            <AlertTitle sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
                                404 - Not Found
                            </AlertTitle>
                            <Typography>
                                The page which is you searched couldn't find.
                            </Typography>
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
    )
}
import { Alert, AlertTitle, Box, Button, List, ListItem, ListItemText } from "@mui/material";
import requests from "../../Api/ApiClient";
import { useState } from "react";

export default function ErrorPage() {
    const [validationError, setValidationError] = useState({});
    function getValidationErrors() {
        requests.errors.getErrorStatus403().catch(data => {
            setValidationError(data);
        })
    }
    return (
        <>
            <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
                {
                    validationError && validationError.errors && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            <AlertTitle >
                                {validationError.message}
                            </AlertTitle>
                            <List >
                                {
                                    validationError.errors.map((error, index) => (
                                        <ListItem key={index}>
                                            <ListItemText>
                                                {error}
                                            </ListItemText>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Alert>
                    )
                }
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    color="error"
                    onClick={() => requests.errors.getErrorStatus400()}
                >
                    Bad Request
                </Button>
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    color="error"
                    onClick={() => requests.errors.getErrorStatus401()}
                >
                    UnAuthorized
                </Button>
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    color="error"
                    onClick={() => getValidationErrors()}
                >
                    Validation Error
                </Button>
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    color="error"
                    onClick={() => requests.errors.getErrorStatus404()}
                >
                    Not Found
                </Button>
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    color="error"
                    onClick={() => requests.errors.getErrorStatus500()}
                >
                    Internal Server Error
                </Button>
            </Box>
        </>
    );
}
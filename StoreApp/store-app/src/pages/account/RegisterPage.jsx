import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./accountSlice";
export default function RegisterPage() {
    const { status } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        }
    });

    function handleForm(data) {
        dispatch(registerUser(data));
    }
    return (
        <Container maxWidth={"xs"} >
            <Paper sx={{ padding: 2 }} elevation={3} >
                <Avatar sx={{ mx: "auto", mb: 2, color: "primary.main" }} >
                    <LockOutlined ></LockOutlined>
                </Avatar>
                <Typography component={"h1"} variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    Sign Up
                </Typography>
                <Box noValidate component={"form"} sx={{ mb: 2 }} onSubmit={handleSubmit(handleForm)}>
                    <TextField
                        {...register("username", {
                            required: "User name is required",
                            minLenght: {
                                value: 5,
                                message: "User name must be at least 5 characters long."
                            }
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        name="username"
                        label="User Name"
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        name="email"
                        label="Email"
                        size="small"
                        type="email"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long. ",
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                message:
                                    "Password must be include at least one uppercase letter, one number, and one special character"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        name="password"
                        label="Password"
                        size="small"
                        fullWidth
                        type="password"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        loading={status === "pending" ? true : false}
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
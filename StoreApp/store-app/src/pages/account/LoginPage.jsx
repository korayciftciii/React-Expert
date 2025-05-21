import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import requests from "../../Api/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "./accountSlice";
export default function LoginPage() {
    const { status } = useSelector((state) => state.account);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });
    const dispacth = useDispatch();
    const navigation = useNavigate();
    function handleForm(data) {
        dispacth(login(data));
    }
    return (
        <Container maxWidth={"xs"} >
            <Paper sx={{ padding: 2 }} elevation={3} >
                <Avatar sx={{ mx: "auto", mb: 2, color: "primary.main" }} >
                    <LockOutlined ></LockOutlined>
                </Avatar>
                <Typography component={"h1"} variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    Login
                </Typography>
                <Box component={"form"} sx={{ mb: 2 }} onSubmit={handleSubmit(handleForm)} noValidate >
                    <TextField
                        {...register("username", {
                            required: "User Name is required",
                        })}
                        name="username"
                        label="User Name"
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        error={!!errors.username}
                        helperText={errors.username?.message}
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
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { router } from "../../App";
import requests from "../../Api/ApiClient";

const initialState = {
    user: null,
    status: "idle"
}

export const login = createAsyncThunk(
    "account/login",
    async (data, thunkAPI) => {
        try {
            const user = await requests.account.login(data)
            localStorage.setItem("user", JSON.stringify(user));
            router.navigate("/");
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const registerUser = createAsyncThunk(
    "account/registerUser",
    async (data, thunkAPI) => {
        try {
            await requests.account.login(data)
            router.navigate("/login");
        } catch (error) {
            return thunkAPI.rejectWithValue({ message });
        }
    }
);
export const getUser = createAsyncThunk(
    'account/getUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                try {
                    dispatch(setUser(JSON.parse(storedUser)));
                } catch (err) {
                    console.error("Invalid user data in localStorage:", err);
                    localStorage.removeItem("user");
                    dispatch(logout());
                }
            }

            const user = await requests.account.getUser();
            dispatch(setUser(user));
            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            console.error("Error initializing user:", err);
            dispatch(logout());
            return rejectWithValue(err.message);
        }
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/login");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = "pending";
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "idle";
        });
        builder.addCase(login.rejected, (state) => {
            state.status = "idle";
        });


        builder.addCase(registerUser.pending, (state) => {
            state.status = "pending";
        });

        builder.addCase(registerUser.fulfilled, (state) => {
            state.status = "idle";
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.status = "idle";
        });


        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/login");
        });
    }
});

export const { setUser, logout } = accountSlice.actions;
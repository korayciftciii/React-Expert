import { Delete } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { currencyTRY } from "../../utils/formats";
import { UseCartContext } from "../../Context/CartContext";
import { useState } from "react";
import requests from "../../Api/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart, setCart } from "./cartSlice";

export default function CartPage() {
    const { cart, status } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.product.quantity * item.product.price), 0);
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    if (!cart || cart.cartItems.lenght === 0) {
        return <Typography>Your Cart is Empty</Typography>
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: 100 }}></TableCell>
                        <TableCell sx={{ width: 80 }}>Product</TableCell>
                        <TableCell sx={{ width: 100 }}>Price</TableCell>
                        <TableCell sx={{ width: 170 }}>Quantity </TableCell>
                        <TableCell sx={{ width: 100 }}>Sum</TableCell>
                        <TableCell sx={{ width: 100 }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        cart.cartItems?.map(item => (
                            <TableRow key={item.product.productId}>
                                <TableCell>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/images/${item.product.image}`}
                                        loading="lazy"
                                        alt={item.product.title}
                                        style={{ width: "100%" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {item.product.title}
                                </TableCell>
                                <TableCell>
                                    {currencyTRY.format(item.product.price)}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => dispatch(addItemToCart({ productId: item.product.productId }))}>
                                        {
                                            status === "pendingAddItem" + item.product.productId ? (<CircularProgress size={'20px'} />) : (<AddCircleOutlineIcon />)
                                        }
                                    </Button>
                                    {item.product.quantity}
                                    <Button onClick={() => dispatch(deleteItemFromCart({ productId: item.product.productId, quantity: 1, key: "single" }))}>
                                        {
                                            status === "pendingDeleteItem" + item.product.productId + "single" ? (<CircularProgress size={'20px'} />) : (<RemoveCircleOutlineIcon />)
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell>{currencyTRY.format(item.product.price * item.product.quantity)}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => dispatch(deleteItemFromCart({ productId: item.product.productId, quantity: item.product.quantity, key: "all" }))}>
                                        {status === "pendingDeleteItem" + item.product.productId + "all" ? (<CircularProgress size={'20px'} />) : (<Delete />)}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    <TableRow>
                        <TableCell align="right" colSpan={5}>Sub Total</TableCell>
                        <TableCell align="right" colSpan={5}>{currencyTRY.format(subTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={5}>Taxes</TableCell>
                        <TableCell align="right" colSpan={5}>{currencyTRY.format(tax)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={5}>Total</TableCell>
                        <TableCell align="right" colSpan={5}>{currencyTRY.format(total)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
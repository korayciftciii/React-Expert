import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import requests from "../Api/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "./catalog/catalogSlice";

export default function ProductsPage() {
    const dispatch = useDispatch();
    const loadedData = useSelector(selectAllProducts);
    const { status, isLoaded } = useSelector((state) => state.catalog);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(fetchProducts());
        }
    }, [isLoaded]);

    if (status === "pendingFetchProducts") {
        return <Loading />
    }
    if (!loadedData) {
        return (
            <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
                <Alert severity="error" sx={{ mt: 4 }}>
                    <Typography variant="h6">Something Went Wrong!!</Typography>
                    <Typography variant="body2">Products you are looking for doesn't exist or may have been removed.</Typography>
                </Alert>
            </Box>
        );
    } else {
        return (
            <ProductList products={loadedData} />
        );
    }
}

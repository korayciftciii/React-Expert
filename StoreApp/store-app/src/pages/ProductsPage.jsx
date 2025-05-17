import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import requests from "../Api/ApiClient";

export default function ProductsPage() {
    const [loadedData, setLoadedData] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await requests.products.list();
                setLoadedData(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
        fetchProducts();
    }, []);

    if (loader) {
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

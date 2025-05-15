import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

export default function ProductsPage() {
    const [loadedData, setLoadedData] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:5000/products');
                const data = await response.json(); // await eksikti
                setLoadedData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
        fetchProducts();
    }, []);

    if (loader) {
        return <h1>Loading...</h1>; // return eksikti
    }

    return (
        <ProductList products={loadedData} />
    );
}

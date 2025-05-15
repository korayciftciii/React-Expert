import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [item, setItem] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`http://localhost:5000/products/${productId}`);
                const data = await response.json(); // await eksikti
                setItem(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
        fetchProductDetails();
    }, [productId]);

    if (loader) {
        return <h1>Loading...</h1>; // return eksikti
    }

    return (
        <h1>{item.title}</h1>
    )
}
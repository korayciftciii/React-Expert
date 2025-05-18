import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { currencyTRY } from '../utils/formats';
import requests from '../Api/ApiClient';
import { useState } from 'react';
import { UseCartContext } from '../Context/CartContext';

export default function ProductCard({ product }) {
    const [loading, setLoading] = useState(false);
    const { setCart } = UseCartContext();
    function handleAddToCart(productId) {
        setLoading(true);
        requests.cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }
    return (
        <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                    <img
                        src={`${import.meta.env.VITE_API_URL}/images/${product.image}`}
                        loading="lazy"
                        alt={product.title}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography level="body-xs">{product.title}</Typography>
                <Link

                    href={`products/${product.id}`}
                    color="neutral"
                    textColor="text.primary"
                    overlay
                    endDecorator={<ArrowOutwardIcon />}
                    sx={{ fontWeight: 'md' }}
                >
                    {product.brand}
                </Link>

                <Typography
                    level="title-lg"
                    sx={{ mt: 1, fontWeight: 'xl' }}
                    endDecorator={
                        <Chip component="span" size="sm" variant="soft" color="success">
                            Lowest price
                        </Chip>
                    }
                >
                    {currencyTRY.format(product.price)}
                </Typography>
                <Typography level="body-sm">
                    (Only <b>{product.stock}</b> left in stock!)
                </Typography>
            </CardContent>
            <CardOverflow>
                <Button loading={loading} onClick={() => handleAddToCart(product.id)} variant="solid" color="primary" size="lg">
                    Add to cart
                </Button>
            </CardOverflow>
        </Card>
    );
}
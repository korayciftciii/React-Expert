import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { currencyTRY } from "../utils/formats";
import Loading from '../components/Loading';
import {
    Typography,
    Box,
    Grid,
    Button,
    Rating,
    Chip,
    Divider,
    Paper,
    Breadcrumbs,
    Link,
    Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import requests from "../Api/ApiClient";

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        async function fetchProductDetails() {
            try {
                setLoading(true);
                const response = await requests.products.details(productId);
                setItem(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProductDetails();
    }, [productId]);

    const handleIncreaseQuantity = () => {
        if (quantity < item.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!item) {
        return (
            <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
                <Alert severity="error" sx={{ mt: 4 }}>
                    <Typography variant="h6">Product not found</Typography>
                    <Typography variant="body2">The product you are looking for doesn't exist or may have been removed.</Typography>
                </Alert>
            </Box>
        );
    }

    const isInStock = item.stock > 0;

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: { xs: 2, md: 3 } }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/products"
                >
                    Products
                </Link>
                <Typography color="text.primary">{item.title}</Typography>
            </Breadcrumbs>

            <Paper
                elevation={3}
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: 'linear-gradient(to bottom, #fcfcfc, #f7f7f7)',
                }}
            >
                <Grid container spacing={0}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: { xs: 300, md: 500 },
                                overflow: 'hidden',
                                background: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRight: { xs: 'none', md: '1px solid #eee' },
                                borderBottom: { xs: '1px solid #eee', md: 'none' },
                            }}
                        >
                            {item.stock <= 5 && item.stock > 0 && (
                                <Chip
                                    label={`Last ${item.stock} items!`}
                                    color="warning"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        fontWeight: 'bold',
                                    }}
                                />
                            )}
                            <img
                                src={`http://localhost:5000/images/${item.image}`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    maxWidth: '90%',
                                    maxHeight: '90%',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Product Information */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            {/* Top Section */}
                            <Box>
                                <Chip
                                    label={item.brand}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        fontSize: { xs: '1.5rem', md: '2.125rem' }
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Rating value={4.5} precision={0.5} readOnly size="small" />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        (127 reviews)
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ mb: 3, lineHeight: 1.6 }}
                                >
                                    {item.description}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Price and Stock Information */}
                            <Box sx={{ mb: 3 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={7}>
                                        <Typography
                                            variant="h4"
                                            color="primary.main"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: { xs: '1.75rem', md: '2.25rem' }
                                            }}
                                        >
                                            {currencyTRY.format(item.price)}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            VAT Included
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {isInStock ? (
                                                <>
                                                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                                                    <Typography
                                                        variant="body2"
                                                        color="success.main"
                                                        fontWeight={500}
                                                    >
                                                        In Stock
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography
                                                    variant="body1"
                                                    color="error"
                                                    fontWeight={500}
                                                >
                                                    Out of Stock
                                                </Typography>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Quantity Selection and Add to Cart */}
                            {isInStock && (
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Quantity</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={handleDecreaseQuantity}
                                            disabled={quantity <= 1}
                                            sx={{ minWidth: '40px', p: '5px' }}
                                        >
                                            -
                                        </Button>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                mx: 2,
                                                fontWeight: 600,
                                                minWidth: '40px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {quantity}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={handleIncreaseQuantity}
                                            disabled={quantity >= item.stock}
                                            sx={{ minWidth: '40px', p: '5px' }}
                                        >
                                            +
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {/* Buttons */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<ShoppingCartIcon />}
                                        disabled={!isInStock}
                                        sx={{
                                            py: 1.5,
                                            fontWeight: 600,
                                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                                            '&:hover': {
                                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
                                            }
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        startIcon={<FavoriteIcon />}
                                        sx={{
                                            py: 1.5,
                                            color: 'grey.700',
                                            borderColor: 'grey.300',
                                        }}
                                    >
                                        Add to Wishlist
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Additional Information */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocalShippingIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Free Shipping (over $10)
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AssignmentReturnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            14-Day Returns
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Additional tabs for product details can be added here */}
        </Box>
    );
}
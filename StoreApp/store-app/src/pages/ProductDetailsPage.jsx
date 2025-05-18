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
    IconButton,
    Stack
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import requests from "../Api/ApiClient";
import { UseCartContext } from "../Context/CartContext";

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { cart, setCart } = UseCartContext();

    const cartItem = cart?.cartItems.find(i => i.product.productId == item?.id);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                setLoading(true);
                const data = await requests.products.details(productId);
                setItem(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = () => {
        setLoading(true);
        requests.cart.addItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    };

    const handleIncreaseQuantity = () => quantity < item.stock && setQuantity(quantity + 1);
    const handleDecreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
    const toggleWishlist = () => setIsWishlisted(!isWishlisted);

    if (loading) return <Loading />;
    if (!item) return (
        <Box sx={{ textAlign: 'center', p: 10 }}>
            <Typography variant="h5">Ürün bulunamadı</Typography>
        </Box>
    );

    const isInStock = item.stock > 0;
    const isLowStock = item.stock <= 5 && item.stock > 0;

    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 4 },
            py: 4
        }}>
            <Grid container spacing={{ xs: 3, md: 6 }}>
                {/* Product Image - Left Side */}
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                        aspectRatio: '1/1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.08)'
                    }}>
                        {isLowStock && (
                            <Chip
                                label={`Son ${item.stock} ürün`}
                                color="error"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    fontWeight: 'bold',
                                    backdropFilter: 'blur(4px)',
                                    bgcolor: 'rgba(255,255,255,0.9)'
                                }}
                            />
                        )}

                        <IconButton
                            onClick={toggleWishlist}
                            sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                bgcolor: 'rgba(255,255,255,0.9)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' }
                            }}
                        >
                            <FavoriteBorderIcon
                                sx={{
                                    color: isWishlisted ? '#ff3d47' : 'rgba(0,0,0,0.5)',
                                    fontSize: '1.5rem'
                                }}
                            />
                        </IconButton>

                        <Box component="img"
                            src={`${import.meta.env.VITE_API_URL}/images/${item.image}`}
                            alt={item.title}
                            loading="lazy"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                mixBlendMode: 'multiply',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        />
                    </Box>
                </Grid>

                {/* Product Info - Right Side */}
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        pl: { md: 2 }
                    }}>
                        {/* Brand & Title */}
                        <Chip
                            label={item.brand}
                            variant="outlined"
                            size="small"
                            sx={{
                                mb: 2,
                                alignSelf: 'flex-start',
                                fontWeight: 600,
                                color: 'primary.main',
                                borderColor: 'primary.main'
                            }}
                        />

                        <Typography variant="h1" sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                            lineHeight: 1.2
                        }}>
                            {item.title}
                        </Typography>

                        {/* Rating */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                            gap: 1
                        }}>
                            <Rating
                                value={4.5}
                                precision={0.5}
                                readOnly
                                sx={{
                                    color: '#faaf00',
                                    fontSize: '1.4rem'
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                (127 değerlendirme)
                            </Typography>
                        </Box>

                        {/* Price */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                mb: 0.5
                            }}>
                                {currencyTRY.format(item.price)}
                            </Typography>
                            {item.originalPrice && (
                                <Typography
                                    variant="body1"
                                    color="text.disabled"
                                    sx={{
                                        textDecoration: 'line-through',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {currencyTRY.format(item.originalPrice)}
                                </Typography>
                            )}
                            <Typography variant="caption" color="text.secondary">
                                KDV Dahil
                            </Typography>
                        </Box>

                        {/* Description */}
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 4,
                                lineHeight: 1.8,
                                color: 'text.secondary',
                                fontSize: '1.05rem'
                            }}
                        >
                            {item.description}
                        </Typography>

                        <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.08)' }} />

                        {/* Quantity Selector */}
                        {isInStock && (
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 600,
                                        fontSize: '1rem'
                                    }}
                                >
                                    Adet
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                    sx={{
                                        width: 'fit-content',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        borderRadius: '8px',
                                        p: 0.5
                                    }}
                                >
                                    <IconButton
                                        onClick={handleDecreaseQuantity}
                                        disabled={quantity <= 1}
                                        sx={{
                                            borderRadius: '6px',
                                            '&:hover': {
                                                bgcolor: 'rgba(0,0,0,0.05)'
                                            }
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            px: 2,
                                            minWidth: '20px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {quantity}
                                    </Typography>
                                    <IconButton
                                        onClick={handleIncreaseQuantity}
                                        disabled={quantity >= item.stock}
                                        sx={{
                                            borderRadius: '6px',
                                            '&:hover': {
                                                bgcolor: 'rgba(0,0,0,0.05)'
                                            }
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Box>
                        )}

                        {/* Add to Cart Button */}
                        <Box sx={{ mt: 'auto' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingCartIcon />}
                                disabled={!isInStock || loading}
                                onClick={handleAddToCart}
                                sx={{
                                    py: 1.75,
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    letterSpacing: '0.5px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: 'none',
                                        bgcolor: 'primary.dark'
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: 'rgba(0,0,0,0.12)',
                                        color: 'rgba(0,0,0,0.26)'
                                    }
                                }}
                            >
                                {loading ? 'Ekleniyor...' : 'Sepete Ekle'}
                            </Button>

                            {cartItem?.product.quantity > 0 && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1.5,
                                        textAlign: 'center',
                                        color: 'primary.main',
                                        fontWeight: 500
                                    }}
                                >
                                    Sepetinizde {cartItem.product.quantity} adet var
                                </Typography>
                            )}

                            {/* Shipping Info */}
                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{
                                    mt: 3,
                                    alignItems: 'center',
                                    bgcolor: 'rgba(0,0,0,0.02)',
                                    p: 2,
                                    borderRadius: '8px'
                                }}
                            >
                                <LocalShippingIcon
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: '1.5rem'
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <Box component="span" sx={{ fontWeight: 600 }}>Ücretsiz kargo</Box> • 3 iş günü içinde kargoda
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
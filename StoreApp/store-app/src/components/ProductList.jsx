import { Breadcrumbs, Grid, Typography, Box, Container, Divider } from "@mui/material";
import ProductCard from "./ProductCard";
import { Link } from "react-router";
import HomeIcon from '@mui/icons-material/Home';

export default function ProductList({ products = [] }) {
    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 3 }}>
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={'/'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Home
                    </Link>
                    <Typography color="text.primary">Products</Typography>
                </Breadcrumbs>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h1" fontWeight={600}>
                        Products
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {products.length} items
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>
                    {products.map((item) => (
                        <Grid item key={item.id} xs={12} sm={4} md={3}>
                            <ProductCard product={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
import StoreIcon from '@mui/icons-material/Store';
import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@mui/material';
import { NavLink } from 'react-router';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { UseCartContext } from '../Context/CartContext';
import { useSelector } from 'react-redux';
const links = [
    { title: "Home", to: '/' },
    { title: "Products", to: '/products' },
]
export default function NavBar() {
    const { cart } = useSelector((state) => state.cart);
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.product.quantity, 0);
    return (

        <AppBar sx={{ backgroundColor: 'primary.light' }} position='static'>
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <IconButton color="inherit">
                        <StoreIcon />
                    </IconButton>
                    {
                        links.map((link, index) => (
                            <Button key={index} component={NavLink} to={link.to} color='inherit'>
                                {link.title}
                            </Button>
                        ))
                    }
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>

                    <IconButton color="inherit" component={NavLink} to='cart' size='large' edge="start">
                        <Badge badgeContent={itemCount} color='primary'>
                            <LocalGroceryStoreIcon />
                        </Badge>
                    </IconButton>
                    <Button component={NavLink} to='login' color='inherit'>
                        Login
                    </Button>
                    <Button component={NavLink} to='register' color='inherit'>
                        Register
                    </Button>

                </Box>
            </Toolbar>
        </AppBar>

    );
}
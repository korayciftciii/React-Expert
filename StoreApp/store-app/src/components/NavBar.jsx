import StoreIcon from '@mui/icons-material/Store';
import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@mui/material';
import { NavLink } from 'react-router';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../pages/account/accountSlice"
const links = [
    { title: "Home", to: '/' },
    { title: "Products", to: '/products' },
]
export default function NavBar() {
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.account)
    const dispacth = useDispatch();
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
                    {
                        user
                            ? (
                                <>
                                    <Button component={NavLink} color='inherit'>{user.username}</Button>
                                    <Button component={NavLink} onClick={() => dispacth(logout())} color='inherit'>LogOut</Button>
                                </>

                            ) : (
                                <>
                                    <Button component={NavLink} to='login' color='inherit'>Login</Button>
                                    <Button component={NavLink} to='register' color='inherit'>Register</Button>
                                </>
                            )

                    }


                </Box>
            </Toolbar>
        </AppBar>

    );
}
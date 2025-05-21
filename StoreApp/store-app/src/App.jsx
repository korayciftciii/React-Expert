import { RouterProvider } from 'react-router'; // Make sure it's react-router-dom
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCart } from './pages/cart/cartSlice';
import { getUser } from './pages/account/accountSlice';
import Loading from './components/Loading';
import { router } from "./hooks/router";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Start with loading as true

    useEffect(() => {
        // Define the initialization function
        const initApp = async () => {
            try {
                // Dispatch actions sequentially
                await dispatch(getUser()).unwrap();
                await dispatch(getCart()).unwrap();
                setLoading(false);
            } catch (error) {
                console.log("Initialization error:", error);
                setLoading(false); // Still set loading to false even on error
            }
        };

        // Call the function
        initApp();
    }, [dispatch]); // Add dispatch as a dependency

    // Show loading component if we're still loading
    if (loading) {
        return <Loading />;
    }

    // Render the application once loaded
    return <RouterProvider router={router} />;
}

export default App;
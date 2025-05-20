import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { CartContextProvider } from './Context/CartContext'
import { store } from './Store/Store'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </Provider>
  </StrictMode>,
)

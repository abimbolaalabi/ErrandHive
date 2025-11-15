import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from './Context/App.jsx'
import { store } from './global/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <AppProvider >
      <ToastContainer />
      <App />
    </AppProvider>
     </Provider>
  </StrictMode>,
)

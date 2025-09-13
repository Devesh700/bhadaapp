import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google"
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById("root")!).render(

<React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
    <Provider store={store}>
        <App/>
    </Provider>
    </GoogleOAuthProvider>
</React.StrictMode>
);

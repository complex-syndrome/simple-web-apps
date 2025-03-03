// Entrypoint of website ("npm run dev" to run website on localhost) [Wrap and display DOM]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
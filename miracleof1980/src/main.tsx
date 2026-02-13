// Polyfills must be imported first (before any web3 libraries load)
import './polyfills';

import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

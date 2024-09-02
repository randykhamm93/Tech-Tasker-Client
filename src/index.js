import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { TechTasker } from './TechTasker'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <TechTasker />
    </BrowserRouter>
)


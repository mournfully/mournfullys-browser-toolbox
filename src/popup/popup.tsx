import { render } from 'solid-js/web'
import app from './components/temp/temp'
import './style.css'

const app_container = document.querySelector("#app-container")
if (!app_container) {
    throw new Error("Cannot find app_container")
}

render(app, app_container)

import { render } from 'solid-js/web'
import app from './temp'
// https://stackoverflow.com/questions/66288645/vite-does-not-build-tailwind-based-on-config
import './style.css'

const app_container = document.querySelector("#app-container")
if (!app_container) {
    throw new Error("Cannot find app_container")
}

render(app, app_container)

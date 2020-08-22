import Router from 'preact-router'

import App from "../common/App";
import { About } from "./About";

export default () => {
    return <Router>
        <App path="/"/>
        <About path="/about"/>
    </Router>
}
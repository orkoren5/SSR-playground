import { Link } from 'preact-router'
import { connect } from 'unistore/preact'
import { actions } from './store'
import Button from "preact-material-components/Button";

interface AppProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const App = ({count, increment, decrement}: AppProps): JSX.Element => (
    <div class="count">
        <p>{count}</p>
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
        <Link href="/about">About</Link>
    </div>
);

export default connect<AppProps, {}, {}, {}>("count", actions)(App);
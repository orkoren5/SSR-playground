import { Link, RouterProps } from 'preact-router'
import { connect } from 'unistore/preact'
import { actions } from './store'
import Button from "preact-material-components/Button";
import * as style from "preact-material-components/Button/style.css";
import useStyles from "../common/useStyles";
import { JSX } from "preact";

interface AppOwnProps extends RouterProps {

}

interface AppProps extends AppOwnProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const App = ({count, increment, decrement}: AppProps): JSX.Element => {
    useStyles(style);
    return <div class="count">
        <p>{count}</p>
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
        <Link href="/about">About</Link>
    </div>
};

export default connect<AppOwnProps, {}, {}, {}>("count", actions)(App);
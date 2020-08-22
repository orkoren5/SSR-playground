import { Provider } from 'unistore/preact'
import Router from '../common/router'

function SSR(props) {
	return (
		<Provider store={props.store}>
			<Router />
		</Provider>
	)
}

export default SSR;
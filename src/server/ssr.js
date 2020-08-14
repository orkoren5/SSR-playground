import { h } from 'preact'
import { Provider } from 'unistore/preact'
import Router from '../common/router'

export default function(props) {
	return (
		<Provider store={props.store}>
			<Router />
		</Provider>
	)
}
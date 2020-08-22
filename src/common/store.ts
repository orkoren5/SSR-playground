import createStore from 'unistore'

interface State {
  count: number;
}

export let actions = store => ({
  increment(state) : State {
    return { count: state.count + 1 }
  },
  decrement(state) : State {
    return { count: state.count - 1 }
  }
});

export default initialState => createStore(initialState)
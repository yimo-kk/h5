const shop = {
    state: {
        token: ""
    },
    mutations: {
        setToken: (state, token) => {
            console.log(state,'state');
            console.log(token,'token');
            state.token = token
        },
    }
}

export default shop 
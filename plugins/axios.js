export default function ({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    if (store.state.localStorage.auth.token) {
      config.headers.common.Authorization = `Bearer ${store.state.localStorage.auth.token}`
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

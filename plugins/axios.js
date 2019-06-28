export default function ({ $axios, store, redirect, app }) {
  $axios.onRequest(config => {
    if (store.state.localStorage.auth.token) {
      config.headers.common.Authorization = `Bearer ${store.state.localStorage.auth.token}`
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      redirect('/404')
    }
    if (code === 403) {
      app.$toast.error('Re-authentication Required!', {
        position: 'top-center',
        duration: 2000
      })
      redirect('/login')
    }
    if (code === 500) {
      redirect('/500')
    }
  })
}

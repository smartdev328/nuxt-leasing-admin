export default function ({ $axios, store, redirect, app }) {
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
    if (code === 403) {
      app.$toast.error('Authentication Failed!', {
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

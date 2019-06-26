export default function ({
  store,
  redirect,
  route
}) {
  if (!store.state.localStorage.status) {
    return redirect('/login?redirect_to=' + route.path)
  }
  if (store.state.localStorage.status && !store.state.localStorage.auth.loggedIn) {
    return redirect('/login')
  }
}

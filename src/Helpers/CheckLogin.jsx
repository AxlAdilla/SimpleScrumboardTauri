import { supabase } from "../supabaseClient"

const checkLogin = async () => {
  return supabase
    .auth
    .getSession()
    .then(res => {       
      if (res.data.session === null) {
        return null
      } else {
        return res.data.session.user.id
      } 
    })
    .catch((err) =>  err)
}

export default checkLogin;
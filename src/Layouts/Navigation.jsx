import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import checkLogin from "../Helpers/CheckLogin";

const Navigation = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    checkLogin()
      .then(uuid => {
        setUserId(uuid)
      })
      .catch((err) => console.log(err))
  })

  function handleSignOut() {
    supabase
      .auth
      .signOut()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container justify-content-center">
          <Link to='/' relative="path" className="navbar-brand text-primary">
            Simple Scrumboard
          </Link>
        </div>
      </nav>
      { (userId) && 
        <div className="my-2 mx-4 text-end">
          <button onClick={handleSignOut} className="btn btn-primary"><span className="fa fa-user"></span> Logout</button>
        </div>
      }
    </div>
  )
}

export default Navigation;
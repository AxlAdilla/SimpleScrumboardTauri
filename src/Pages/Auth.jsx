import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Footer from '../Layouts/Footer';
import Navigator from '../Layouts/Navigation';
import { Link, useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertError, setAlertError] = useState(null)
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault()

    supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res)
        if(res.error !== null) {
          setAlertError(res.error.message)
        } else {
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Navigator />
      <main className="create-card mt-5 py-3">
        <div className="container ">
          <div className="row">
            <form onSubmit={handleLogin}>
              <div className="mb-12">
                <label className="form-label">Email</label>
                <input required type="email" className="form-control" id="email"  onChange={(event) => setEmail(event.target.value)} name="email" />
              </div>
              <div className="mb-12">
                <label className="form-label">Password</label>
                <input required type="password" className="form-control" id="password" onChange={(event) => setPassword(event.target.value)} name="password" />
              </div>
              { (alertError) &&
                <div className="alert alert-danger mt-3" role="alert">
                  {alertError}
                </div>
              }
              <div className="mt-3 mb-12 d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
            <div className='d-flex flex-column justify-content-center text-center'>
              <div>
                <span>Dont have account yet? </span>
                <Link to='/sign-up' relative="path">
                  Sign Up
                </Link>
              </div>
              <div>
                <span>Forget your password? </span>
                <Link to='/forget-password' relative="path">
                  Login via email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


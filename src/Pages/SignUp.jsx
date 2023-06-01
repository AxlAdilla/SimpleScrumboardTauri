import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Footer from '../Layouts/Footer';
import Navigator from '../Layouts/Navigation';

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [alertError, setAlertError] = useState(null)
  const [alertSuccess, setAlertSuccess] = useState(null)

  const handleSignUp = async (event) => {
    event.preventDefault()

    if(!alertError) {
      supabase.auth.signUp({
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res)
        if(res.error !== null) {
          setAlertError(res.error.message)
        } else {
          setEmail('')
          setPassword('')
          setRepassword('')
          setAlertError(null)
          setAlertSuccess('Create data success, Confirm your email')
        }
      })
      .catch(err => console.log(err))
    }
  }

  const handleRepassword = async (event) => {
    setRepassword(event.target.value)
    if (event.target.value !== password) {
      setAlertError("Password Confirmation not same")
    } else {
      setAlertError(null)
    }
  }

  return (
    <div>
      <Navigator />
      <main className="create-card mt-5 py-3">
        <div className="container ">
          <div className="row">
            <form onSubmit={handleSignUp}>
              <div className="mb-12">
                <label className="form-label">Email</label>
                <input required type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} name="email" />
              </div>
              <div className="mb-12">
                <label className="form-label">Password</label>
                <input required type="password" className="form-control" id="password" value={password} onChange={(event) => setPassword(event.target.value)} name="password" />
              </div>
              <div className="mb-12">
                <label className="form-label">Confirm Password</label>
                <input required type="password" className="form-control" id="repassword" value={repassword} onChange={handleRepassword} name="repassword" />
              </div>
              { (alertError) &&
                <div className="alert alert-danger mt-3" role="alert">
                  {alertError}
                </div>
              }
              { (alertSuccess) &&
                <div className="alert alert-success mt-3" role="alert">
                  {alertSuccess}
                </div>
              }
              <div className="mt-3 mb-12 d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Footer from '../Layouts/Footer';
import Navigator from '../Layouts/Navigation';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [alertSuccess, setAlertSuccess] = useState('');

  const handleForgetPassword = async (event) => {
    event.preventDefault()

    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: import.meta.env.VITE_WEB_DOMAIN,
    })
    .then((res) => {
      setEmail('');
      setAlertSuccess('Email already sent, Please check your email');
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>
      <Navigator />
      <main className="create-card mt-5 py-3">
        <div className="container ">
          <div className="row">
            <form onSubmit={handleForgetPassword}>
              <div className="mb-12">
                <label className="form-label">Email</label>
                <input required type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} name="email" />
              </div>
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


import { Link, useParams } from 'react-router-dom';
import Footer from '../Layouts/Footer';
import Navigator from '../Layouts/Navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import checkLogin from '../Helpers/CheckLogin';

function Create() {
  let {id} = useParams();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#0d6efd');
  const [userId, setUserId] = useState('');

  function handleSubmit(event) {
    supabase
      .from('cards')
      .insert({ 
        title: title, 
        board_id: id,
        color: color,
        description: description,
        user_id: userId
      })
      .then((res) => {
        if (res.status === 201) {
          setAlertSuccess(true) 
          setTitle('')
          setDescription('')
          setColor('#0d6efd')
        } else {
          console.log(res) 
        }
      })
      .catch(err => console.log(err))

    event.preventDefault();
  }

  useEffect(() => {
    checkLogin()
      .then(uuid => {
        setUserId(uuid)
      })
      .catch((err) => console.log(err))
  })

  return (
    <div>
      <Navigator />
      <main className="create-card mt-5 py-3">
        <div className="container ">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <label className="form-label">Title</label>
                <input required type="text" className="form-control" id="title" value={title} name="title" onChange={(event) => setTitle(event.target.value)}/>
              </div>
              <div className="mb-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={description} rows="3" onChange={(event) => setDescription(event.target.value)}></textarea>
              </div>
              <div className="mb-12">
                <label className="form-label">Choose your card color</label>
                <input type="color" className="cardColor d-block" id="cardColor" value={color} title="Choose your card color" onChange={(event) => setColor(event.target.value)}/>
              </div>
              { alertSuccess &&
                <div className="alert alert-success mt-3" role="alert">
                  Card Successfully Added
                </div>
              }
              <div className="mt-3 mb-12 d-flex justify-content-between">
                <Link to='/' relative="path" className="btn btn-primary">
                  Back
                </Link>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Create;

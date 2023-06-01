import { useEffect, useState } from 'react';
import Board from '../Components/Board';
import Footer from '../Layouts/Footer';
import Navigator from '../Layouts/Navigation';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import checkLogin from '../Helpers/CheckLogin';

function App() {
  const [boards, setBoards] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  async function fetchData(uuid) {
    supabase
      .from('boards')
      .select(`id, name, cards (
        id,
        title,
        description,
        color,
        board_id,
        user_id
      )`)
      .eq('cards.user_id', uuid)
      .then(res => {
        setBoards(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    checkLogin()
      .then((uuid) => {
        console.log(uuid)
        if (uuid) {
          setUserId(uuid)
          fetchData(uuid)
        } else {
          throw new Error('User not authenticated');
        }
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })
  }, [navigate])

  function updatePage() {
    fetchData(userId)
  }

  const boardList = [];
  for (const board of boards) {
    boardList.push(<Board handleUpdatePage={updatePage} key={board.id} data={board} />)
  }

  return (
    <div>
      <Navigator />
      <div id="board-container" className="d-flex pt-4">
        {boardList}
      </div>
      <Footer />
    </div>
  );
}

export default App;

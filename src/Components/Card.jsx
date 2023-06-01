import { supabase } from '../supabaseClient';

const Card = (props) => {
  function disableBackButton() {
    return (props.data.board_id === 1) ? true : false;
  }
  function disableNextButton() {
    return (props.data.board_id === 6) ? true : false;
  }
  function handleDelete() {
    supabase
      .from('cards')
      .delete()
      .eq('id', props.data.id)
      .then(res => {
        props.handleUpdatePage()
      })
      .catch(err => console.log(err))
  }
  function handleUpdateBoard(updateType) {
    let updateBoard_id ;
    if (updateType === 'next') {
      updateBoard_id = props.data.board_id + 1;
    } else {
      updateBoard_id = props.data.board_id - 1;
    }

    supabase
      .from('cards')
      .update({
        board_id: updateBoard_id
      })
      .eq('id', props.data.id)
      .then(res => {
        props.handleUpdatePage()
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="card col-md-5 col-10">
      <div className="card-header" style={{backgroundColor: props.data.color}}></div>
      <div className="card-body" >
        <h5 className="card-title">{props.data.title}</h5>
        <p className="card-text">{props.data.description}</p>
      </div>
      <div className="card-footer d-flex justify-content-around flex-wrap" style={{backgroundColor: props.data.color}}>
        <button onClick={() => {handleUpdateBoard('back')}} className="btn col-md-4 col-sm-12 col-12 btn-primary" disabled={disableBackButton()}>
            <span className="fa fa-arrow-left"></span>
        </button>
        <button onClick={handleDelete} className="btn col-md-4 col-sm-12 col-12 btn-danger">
            <span className="fa fa-trash"></span>
        </button>
        <button onClick={() => {handleUpdateBoard('next')}} className="btn col-md-4 col-sm-12 col-12 btn-primary" disabled={disableNextButton()}>
            <span className="fa fa-arrow-right"></span>
        </button>
      </div>
    </div>
  )
}

export default Card;
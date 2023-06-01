import Card from "./Card";
import { Link } from "react-router-dom";

const Board = (props) => {
  const cardList = [];

  for (const card of props.data.cards) {
    cardList.push(
      <Card handleUpdatePage={props.handleUpdatePage} data={card} key={card.id}/>
    )
  }

  return (
    <div className="col-md-8 col-sm-12 col-12 board-box-side">
    <div className="board-box-title">
      <div className="title-board">{props.data.name}</div>
    </div>
    <div className="d-flex justify-content-end pt-4 px-5">
      <Link to={'./create/' + props.data.id} relative="path" className="btn col-md-4 col-sm-4 col-12 btn-primary">
        <span className="fa fa-plus"></span> Card
      </Link>
    </div>
    <div className="card-holder">
      <div className="d-flex flex-wrap justify-content-between">
        {cardList}
      </div>
    </div>
  </div>
  )
}

export default Board;
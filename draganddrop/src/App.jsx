import React, { useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


const App = () => {
  const [cards, setCards] = useState([]);
  const [popUp, setPopup] = useState(null);

  const addCard = () => {
    const newCard = {
      id: `card-${cards.length + 1}`,
      content: `This is some dummy text for card ${cards.length + 1}. ` + 
               "This part of the text will be hidden initially.",
      x:200,
      y:50,
    };
    setCards([...cards, newCard]);
  };

  const togglePopup = (content) => {
    setPopup(content);
  };

  return (
    <div className="canvas-container">
      
      <div className="canvas">
      <button onClick={addCard} className="btn">Create Card</button>
        {cards.map((card, index) => (
          <Draggable
            key={card.id}
            defaultPosition={{ x: card.x, y: card.y }}
            onStop={(e, data) => {
              const newCards = [...cards];
              newCards[index].x = data.x;
              newCards[index].y = data.y;
              setCards(newCards);
            }}
          >
            <ResizableBox
              width={200}
              height={150}
              
              className="card"
            >
              <div id={card.id}>
                <h3>Card {index + 1}</h3>
                <p>{card.content.substring(0, 50)}...</p>
                <button className="show-btn" onClick={() => togglePopup(card.content)}>
                  Show More
                </button>
              </div>
            </ResizableBox>
          </Draggable>
        ))}

        {cards.length > 1 && cards.map((card, index) => {
          if (index < cards.length - 1) {
            return <Xarrow key={index} start={cards[index].id} end={cards[index + 1].id} />;
          }
          return null;
        })}
      </div>

      {popUp && (
        <div className="popup">
          <h3>Card Details</h3>
          <p>{popUp}</p>
          <button className="close-btn" onClick={() => setPopup(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;

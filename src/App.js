import React, { useState } from 'react';
import DataCenter from './data.js';

function App() {
  const [cash, setCash] = useState(2000);
  const [inventory, setInventory] = useState(Array(DataCenter.drugs.length).fill(0));

  const buy = (index) => {
    const price = DataCenter.drugs[index].minimum_price;
    if(cash >= price){
      setCash(cash - price);
      const inv = [...inventory];
      inv[index] += 1;
      setInventory(inv);
    }
  };

  const sell = (index) => {
    const price = DataCenter.drugs[index].minimum_price;
    if(inventory[index] > 0){
      setCash(cash + price);
      const inv = [...inventory];
      inv[index] -= 1;
      setInventory(inv);
    }
  };

  return (
    React.createElement('div', {className:'container'},
      React.createElement('h1', null, 'DopeWars.js Modern'),
      React.createElement('p', null, `Cash: $${cash}`),
      React.createElement('table', {className:'table'},
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Drug'),
            React.createElement('th', null, 'Owned'),
            React.createElement('th', null, 'Actions')
          )
        ),
        React.createElement('tbody', null,
          DataCenter.drugs.map((drug, idx) => (
            React.createElement('tr', {key:idx},
              React.createElement('td', null, drug.name),
              React.createElement('td', null, inventory[idx]),
              React.createElement('td', null,
                React.createElement('button', {className:'btn btn-sm btn-primary', onClick:()=>buy(idx)}, 'Buy'),
                React.createElement('button', {className:'btn btn-sm btn-secondary ms-2', onClick:()=>sell(idx)}, 'Sell')
              )
            )
          ))
        )
      )
    )
  );
}

export default App;

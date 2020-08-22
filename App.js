import React, { useState } from 'react';
import './App.css';



function App (props) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  function onFilterTextChange (e) {
    setFilterText(e.target.value);
  }
  function onInStockOnlyChange (e) {
    setInStockOnly(e.target.checked);
  }
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search.."
          onChange={onFilterTextChange}
          />
        <p><input
            type="checkbox"
            onChange={onInStockOnlyChange}
            />{' '}Only show products in stock</p>
      </form>
      <GoodsTable
        products={props.products}
        filterText={filterText}
        inStockOnly={inStockOnly}

        />
    </div>

  );
}

function GoodsTable (props) {
  const rows = [];
  let lastCategory = null;
  props.products.forEach( (product) => {
    let xName = product.name.toLowerCase();
    if (xName.indexOf(props.filterText.toLowerCase()) === -1) {
      return;
    }
    if (props.inStockOnly && !product.stocked) {
      return;
    }

    //category 
    let name = product.stocked ?
               product.name :
               <span style={{color: 'pink'}}>
                 {product.name}
               </span>;
    if (product.category != lastCategory) {
      rows.push(
        <tr key={product.category}>
          <th>{product.category}</th>
        </tr>
      );
      lastCategory = product.category;
    }


    //products
    rows.push(
      <tr key={product.name}>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
   });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>

  );
}



export default App;

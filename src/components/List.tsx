import { useState } from "react";

type ListProps = {
  initialItems: string[]
}

function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState('')
  const [list, setList] = useState(initialItems);

  function addToList() {
    setTimeout(() => {
      setList(state => [...state, newItem]);
    }, 500);
  }

  function removeFromList(item: string) {
    setTimeout(() => { 
      setList(state => state.filter(itemList => itemList !== item));
    }, 500);
  }

  return (
    <>
      <input type="text" placeholder="Novo item" onChange={e => setNewItem(e.target.value)} />
      <button type="button" onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => (
        <li key={item}>
          {item}
          <button onClick={() => removeFromList(item)}>Remover</button>
        </li>))}
      </ul>
    </>
  );
}

export default List

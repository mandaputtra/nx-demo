import './app.module.css'
import { useEffect, useState } from 'react';
import NxWelcome from './nx-welcome';
import { ItemType } from '@nx-demo/shared/jsonschema'

const API_URL = 'http://localhost:3000'

async function parseResponse<T>(res: Response): Promise<T> {
  const json = await res.json()
  if (!res.ok) {
    throw Error(json)
  }
  return json
}

export function App() {
  const [items, setItems] = useState<ItemType[]>([])


  async function getItems() {
    const res = await fetch(API_URL)
    const json = await parseResponse<ItemType[]>(res)
    setItems(json)
  }

  useEffect(() => {
    async function handler() {
      await getItems()
    }

    handler()
  }, [])

  async function addItems() {
    const body = {
      title: 'This is a random title',
      year: Math.floor(Math.random() * 10000)
    }
    await fetch(API_URL, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(body)}
    )
    await getItems()
  }

  return (
    <div className="wrapper">
      <NxWelcome title="JogjaJS" />
      { items.map(({ title, year }, index) => (<div key={index}>
          <p>{`${title} - ${year}`}</p>
        </div>
      ))}
      <button onClick={addItems}>add</button>
    </div>
  );
}

export default App;

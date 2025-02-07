import { FormEvent, useState, useEffect } from 'react';

// Todo の型定義
interface Todo {
  id: number;
  title: string;
}

export default function Home() {
  // todos の状態に Todo 型の配列であることを明示
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  // 初回レンダリング時にバックエンドから Todo を取得
  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch(err => console.error(err));
  }, []);

  // Todo の追加処理
  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    // newTodo にも Todo 型を適用
    const newTodo: Todo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} 
            <button onClick={() => {
              // Todo の削除処理など
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
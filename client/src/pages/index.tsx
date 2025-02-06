import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // 初回レンダリング時にバックエンドから Todo を取得
  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  }, []);

  // Todo の追加処理
  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  // Todo の削除処理
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
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
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

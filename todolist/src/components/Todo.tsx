import { useEffect, useRef, useState } from 'react'
import todo_ico from '../assets/todo_ico.svg'
import Todoitems from './Todoitems.tsx'

// Class for missions, feeling fancy to use this instead of interface
class Missions {
  id = Date.now();
  isComplete = false;
  constructor(public inputText: string) {};
}

const Todo = () => {
  // Use state run once only, unless settodoList runs
  const [todoList, settodoList] = useState<Missions[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  // Input parsed to here
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const inputText: string = inputRef.current?.value.trim() ?? ""; // If null ""
    if (!inputText) return;
    settodoList((prev) => [...prev, new Missions(inputText)]); // Append to array
    inputRef.current!.value = ""; // Reset input "buffer?"
  }

  // filter to all based on conditional and map values to certain elements that fufil conditional
  const delTodo = (id: number) => settodoList((prvTodos) => prvTodos.filter((todo) => todo.id !== id))
  const toggle = (id: number) => settodoList((prevTodos) => prevTodos.map((todo) => todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo))

  useEffect(() => { // Will only change when dependency [todoList] changes
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]) 
  
  // HTML core
  return ( 
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        
        {/* title */}
        <div className='flex items-center mt-7 gap-2'>
          <img className='w-8' src={todo_ico} alt="" />
          <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/* input field */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
          <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task here'/>
          <button onClick={addTodo} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>

        {/* Item list */}
        <div>{todoList.map((item, idx) => <Todoitems key={idx} mission={item.inputText} id={item.id} isComplete={item.isComplete} delTodo={delTodo} toggle={toggle}/>)}</div>
    </div>
  )
}

export default Todo
import tick_ico from '../assets/tick.svg';
import tick_no_ico from '../assets/tick_no.svg';
import del_ico from '../assets/del.svg';

// Parameter datatypes
interface TodoitemsProps {
    mission: string
    id: number
    isComplete: boolean
    delTodo: (id: number) => void;
    toggle: (id: number) => void;
}

const Todoitems = ({mission, id, isComplete, delTodo, toggle}: TodoitemsProps) => {
  return (
    <div onClick={() => toggle(id)} className='flex items-center my-3 gap-2'>
        <div className='mb-1 flex flex-1 items-center cursor-pointer'>
            <img className='w-7 mr-3' src={isComplete ? tick_ico: tick_no_ico} alt="" />
            <p className={`${isComplete ? 'line-through text-slate-500' : 'text-slate-700'} text-[17px]`}>
                {mission}
            </p>
        </div>

        <img onClick={() => delTodo(id)} className='w-7 cursor-pointer' src={del_ico} alt="" />
    </div>
  )
}

export default Todoitems
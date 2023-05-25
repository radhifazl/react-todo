import { EditButton, DeleteButton, MarkButton, StarButton } from './Buttons'
import './Todo.css'

const TodoItem = ({ todo, onEdit, onDelete, OnMark, OnStar }) => {
    return (
        <div className={`todo-item my-3 w-full flex justify-between items-center bg-white rounded-md p-4 shadow-xl ${todo.isDone ? 'done' : 'undone'}`}>
            <div>
                {
                    todo.isImportant ? (
                        <p className={'importance my-2 font-bold'}>Important</p>
                    ) : ''
                }
                <h1 className={'text-xl font-medium'}>{ todo.activity }</h1>
            </div>
            <div className="todo-actions flex items-center">
                <EditButton onClick={ onEdit } />
                <DeleteButton onClick={ onDelete } />
                <MarkButton status={todo.isDone} onClick={ OnMark } />
                <StarButton status={todo.isImportant} onClick={ OnStar } />
            </div>
        </div>
    )
}

export default TodoItem
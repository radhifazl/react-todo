import { useState } from "react"
import Form from "./Form"
import Sidebar from "./Sidebar"
import { EditButton, DeleteButton, MarkButton, StarButton } from "./Buttons"
import './Todo.css'
import TodoItem from "./TodoItem"

const Todo = () => {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const [filteredTodos, setFilteredTodos] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        id: null,
        activity: ''
    })
    const [editTodo, setEditTodo] = useState('')
    const [isImportant, setIsImportant] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)



    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(newTodo === '') {
            alert('Todo cannot be empty')
        } else {
            setTodos((prevTodos) => [...prevTodos, {
                id: Math.floor(Math.random() * 1000),
                activity: newTodo,
                isDone: false,
                isImportant: false
            }])
        }

        setNewTodo('')
    }

    const showEdit = (id, activity) => {
        setEditData({id, activity})
        setEditTodo(activity)
        setIsEditing(true)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        if(editTodo === '') {
            alert('Todo cannot be empty')
        } else {
            setTodos((prevTodos) => prevTodos.map((todo) => {
                if(todo.id === editData.id) {
                    return {
                        ...todo,
                        activity: editTodo
                    }
                } else {
                    return todo
                }
            }))
        }

        setIsEditing(false)
        setEditData({
            id: null,
            activity: ''
        })
        setEditTodo('')
    }

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    const showImportantTodo = () => {
        setIsFiltered(true)
        setIsImportant(true)
        setIsCompleted(false)
        setFilteredTodos(todos.filter((todo) => todo.isImportant === true))
    }

    const showCompletedTodo = () => {
        setIsFiltered(true)
        setIsCompleted(true)
        setIsImportant(false)
        setFilteredTodos(todos.filter((todo) => todo.isDone === true))
    }

    return (
        <div className={'w-full h-screen flex items-start'}>
            <Sidebar>
                <h1 className={'text-2xl font-semibold mt-5'}>Todo List</h1>

                {
                    isEditing ? (
                        <Form onSubmit={ handleUpdate }>
                            <h1 className={'font-semibold mb-3'}>Edit Todo with ID : { editData.id }</h1>
                            <input 
                                type="text" className="border-2 border-gray-400 rounded-md outline-none p-2 w-full bg-white"
                                value={ editTodo } onChange={ (e) => setEditTodo(e.target.value) } 
                            />
                        </Form>
                    ) : (
                        <Form onSubmit={ handleSubmit }>
                            <h1 className={'font-semibold mb-3'}>Add New Todo</h1>
                            <input 
                                type="text" className="border-2 border-gray-400 rounded-md outline-none p-2 w-full bg-white"
                                value={ newTodo } onChange={ (e) => setNewTodo(e.target.value) } 
                            />
                        </Form>
                    )
                }

                <ul>
                    <li>
                        <button onClick={ () => {
                            setIsFiltered(false)
                            setIsImportant(false)
                            setIsCompleted(false)
                        } }>
                            <h1 className={`text-lg font-semibold mt-5 ${!isCompleted && !isImportant ? 'text-blue-500' : ''}`}>
                                Show All ({todos.length})
                            </h1>
                        </button>
                    </li>
                    <li>
                        <button onClick={ showCompletedTodo } className={'my-5'}>
                            <h1 className={`text-lg font-semibold ${isCompleted ? 'text-blue-500' : ''}`}>
                                Completed ({todos.filter((todo) => todo.isDone === true).length})
                            </h1>
                        </button>
                    </li>
                    <li>
                        <button onClick={ showImportantTodo }>
                            <h1 className={`text-lg font-semibold ${isImportant ? 'text-blue-500' : ''}`}>
                                Important ({todos.filter((todo) => todo.isImportant === true).length})
                            </h1>
                        </button>
                    </li>
                </ul>
            </Sidebar>

            <div className="todo-wrapper w-full h-full p-5">
            {
                isFiltered ? (
                    filteredTodos && filteredTodos.map((todo) => {
                        return (
                            <TodoItem key={todo.id} 
                                todo={todo} 
                                onDelete={() => deleteTodo(todo.id)} 
                                onEdit={() => showEdit(todo.id, todo.activity)} 
                                OnMark={() => {
                                    setTodos((prevTodos) => prevTodos.map((prevTodo) => {
                                        if(prevTodo.id === todo.id) {
                                            return {
                                                ...prevTodo,
                                                isDone: !prevTodo.isDone
                                            }
                                        } else {
                                            return prevTodo
                                        }
                                    }))
                                }}
                                OnStar={() => {
                                    setTodos((prevTodos) => prevTodos.map((prevTodo) => {
                                        if(prevTodo.id === todo.id) {
                                            return {
                                                ...prevTodo,
                                                isImportant: !prevTodo.isImportant
                                            }
                                        } else {
                                            return prevTodo
                                        }
                                    }))
                                }}
                            />
                        )
                    })
                ) : (
                    todos && todos.map((todo) => {
                        return (
                            <TodoItem key={todo.id} 
                                todo={todo} 
                                onDelete={() => deleteTodo(todo.id)} 
                                onEdit={() => showEdit(todo.id, todo.activity)} 
                                OnMark={() => {
                                    setTodos((prevTodos) => prevTodos.map((prevTodo) => {
                                        if(prevTodo.id === todo.id) {
                                            return {
                                                ...prevTodo,
                                                isDone: !prevTodo.isDone
                                            }
                                        } else {
                                            return prevTodo
                                        }
                                    }))
                                }}
                                OnStar={() => {
                                    setTodos((prevTodos) => prevTodos.map((prevTodo) => {
                                        if(prevTodo.id === todo.id) {
                                            const index = prevTodos.indexOf(prevTodo)
                                            prevTodos.splice(index, 1)
                                            prevTodos.unshift(prevTodo)

                                            return {
                                                ...prevTodo,
                                                isImportant: !prevTodo.isImportant
                                            }
                                        } else {
                                            return prevTodo
                                        }
                                    }))
                                }}
                            />
                        )
                    })
                )
            }
            {/* {todos && todos.map((todo) => {
                    return (
                        <div key={todo.id} className={`todo-item my-3 w-full flex justify-between items-center bg-white rounded-md p-4 shadow-xl ${todo.isDone ? 'done' : 'undone'}`}>
                            <div>
                                {
                                    todo.isImportant ? (
                                        <p className={'importance my-2 font-bold'}>Important</p>
                                    ) : ''
                                }
                                <h1 className={'text-xl font-medium'}>{ todo.activity }</h1>
                            </div>
                            <div className="todo-actions flex items-center">
                                <EditButton onClick={() => showEdit(todo.id, todo.activity)}/>
                                <DeleteButton onClick={() => deleteTodo(todo.id)}/>
                                <MarkButton status={todo.isDone} 
                                    onClick={() => setTodos((prevTodos) => prevTodos.map((prevTodo) => {
                                        if(prevTodo.id === todo.id) {
                                            return {
                                                ...prevTodo,
                                                isDone: !prevTodo.isDone
                                            }
                                        } else {
                                            return prevTodo
                                        }
                                    }))}
                                />
                                <StarButton status={todo.isImportant} 
                                    onClick={() => setTodos((prevTodos) => prevTodos.map((prevTodo) => {
                                        if(prevTodo.id === todo.id) {
                                            return {
                                                ...prevTodo,
                                                isImportant: !prevTodo.isImportant
                                            }
                                        } else {
                                            return prevTodo
                                        }
                                    }))}
                                />
                            </div>
                        </div>
                    )
            })} */}
            </div>
        </div>
        
    )
}

export default Todo
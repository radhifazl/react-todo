const commonButtonStyle = `text-gray-400 rounded-md p-2 mx-2 font-semibold transition duration-200 border border-slate-400 focus:outline-none`

const EditButton = ({ onClick }) => {
    return (
        <button onClick={onClick}
            className={`${commonButtonStyle} hover:border-green-500 hover:text-green-500`}
        >
            <i className='bx bx-fw bx-edit-alt' ></i>
        </button>
    )
}

const DeleteButton = ({ onClick }) => {
    return (
        <button onClick={onClick}
            className={`${commonButtonStyle} hover:border-red-600 hover:text-red-600`}
        >
            <i className='bx bx-fw bx-trash'></i>
        </button>
    )
}

const MarkButton = ({ onClick, status = false }) => {
    return (
        <button onClick={onClick}
            className={`${commonButtonStyle} hover:border-green-400 hover:text-green-400 ${status ? 'border-green-400 bg-green-400' : ''}`}
        >
            { status ? <i className='bx bx-fw bxs-badge-check text-white' ></i> : <i className='bx bx-fw bx-badge-check'></i> }
        </button>
    )
}

const StarButton = ({ onClick, status = false }) => {
    return (
        <button onClick={onClick}
            className={`${commonButtonStyle} hover:border-yellow-500 hover:text-yellow-500 ${status ? 'border-yellow-500 bg-yellow-400' : ''}`}
        >
            { status ? <i className='bx bx-fw bxs-star text-white'></i> : <i className='bx bx-fw bx-star'></i> }
        </button>
    )
}

export { EditButton, DeleteButton, MarkButton, StarButton }
const submitButton = () => {
    return (
        <button className="w-full my-5 py-2 px-5 rounded-md bg-blue-400 transition duration-200 hover:bg-blue-600 text-white font-semibold">
            Submit
        </button>
    )
}

const Form = ({children, ...props}) => {
    return (
        <form {...props} className={'my-10 mx-auto'}>
            { children }
            { submitButton() }
        </form>
    )
}

export default Form
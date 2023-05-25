const Sidebar = ({ children }) => {
    return (
        <div className="sidebar w-1/4 rounded-md p-5 bg-white h-full">
            { children }
        </div>
    )
}

export default Sidebar
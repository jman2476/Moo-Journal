function AdminControl({adminObj : {runFxn, msg}}) {
    // console.log(props)
    return (
        <div className='adminControl flex flex-row items-center'>
            <p>ADMIN</p>
            <button onClick={runFxn} className="admin-btn">{msg}</button>
        </div>
    )
}

export default AdminControl
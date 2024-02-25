function AdminControl({adminObj : {runFxn, msg}}) {
    // console.log(props)
    return (
        <div className='adminControl flex flex-row items-center bg-green pa1'>
            <p className="mj-text fw8">ADMIN</p>
            <button onClick={runFxn} className="admin-btn">{msg}</button>
            {/* <button>Hide</button> */}
        </div>
    )
}

export default AdminControl
// import {useStore} from '../store'


function AdminControl() {

    const msg = 'Changed Logged in State'

    const runFxn = () => {

    }
    return (
        <div className='adminControl flex flex-row items-center bg-green pa1'>
            <p className="mj-text fw8">ADMIN</p>
            <button onClick={() => {runFxn}} className="admin-btn">{msg}</button>
        </div>
    )
}

export default AdminControl
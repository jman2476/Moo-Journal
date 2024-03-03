

function Feedback() {

    return (
        <div className="feedbackform justify-center w-100">
            <h1 className="bb pb3 ma0 text-left">Give us your feedback</h1>

            <form>

                <input name="name" type="text" placeholder="Enter your Name" />
                <textarea name="message" type="text" row="3" placeholder="Enter your feedback" style={{ width: '100%', resize: 'none' }} />
                <button style={{ marginLeft: '100px' }}>Comment</button>
            </form>
        </div>
    )
}

export default Feedback


import '../styles/pages/feedbackPage.scss';

function Feedback() {

    return (
        <div className="feedbackform justify-center w-100">
            <h1 className="bb tl pb3 ma0">Give us your feedback</h1>
            <h3 style={{ textAlign:'left' }} className="ma0 pb3">Have any ideas to improve MooJournal to share with us?</h3>

            <form>

                <input name="name" type="text" placeholder="Enter your Name" />
                <textarea name="message" type="text" row="3" placeholder="Enter your feedback" style={{ width: '100%', resize: 'none' }} />
                <button style={{ marginTop:'10px'}}>Comment</button>
            </form>
        </div>
    )
}
export default Feedback
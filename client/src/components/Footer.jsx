import grass from '../assets/Green-grass-clipart-free-pictures.png'
// The footer should contain group members with their linkedIn and Github accts linked.
// Also any relevant links that go on a footer(e.g. the about page)

function Footer(){
    return (
        <footer className="flex flex-row items-center justify-between">
            <img src={grass} alt="Grass"></img>
            <div>
                <p>people who contributed to project</p>
            </div>
        </footer>
    )
}

export default Footer
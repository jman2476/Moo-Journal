import grass from '../assets/Green-grass-clipart-free-pictures.png'

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
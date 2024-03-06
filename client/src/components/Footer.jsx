// import grass from '../assets/Green-grass-clipart-free-pictures.png'
import github from '../assets/Github-icon.png'
import linkedIn from '../assets/LI-icon.png'
import grass from '../assets/Green-grass-clipart-free-pictures.png'
import grassMobile from '../assets/Green-grass-clipart-free-pictures-mobile.png'
import '../styles/components/footer.scss'

function Footer() {
    const contributors = [
        { name: 'Winston James Jr', github: 'https://github.com/wintino5', linkedIn: 'https://www.linkedin.com/in/winston-james-jr/' },
        { name: 'Jeremy McKeegan', github: 'https://github.com/jman2476', linkedIn: 'https://www.linkedin.com/in/jeremy-mckeegan-241a842aa/' },
        { name: 'Charles Swayne', github: 'https://github.com/cjswayne', linkedIn: 'https://www.linkedin.com/in/charles-swayne/' },
        { name: 'Shannon Tice', github: 'https://github.com/shannontice', linkedIn: 'https://www.linkedin.com/in/shannon-tice/' },
        { name: 'Jasvinder Saini', github: 'https://github.com/jsaini1727', linkedIn: 'https://www.linkedin.com/in/jasvinder-saini2769/' },

    ];

    return (
        <footer>
            <div className="footer-overlay"></div>
            <div className="imgWrap">
                <img className="desktop" src={grass} alt="pic of grass"></img>
                <img className="mobile" src={grassMobile} />
            </div>
            <div className="contributors flex pl1 justify-between">
                <div className="flex flex-wrap f7 tl pl2 people">
                    {contributors.map((contributor, index) => (
                        <span className='flex pr3' key={index}>
                            <a href={contributor.github} className="ph0 person hover-white">{contributor.name}</a>
                            <a className='icons' href={contributor.github} target="_blank" rel="noopener noreferrer">
                                <img src={github} alt="GitHub Icon" className="iconStyles" />
                            </a>
                            <a className='icons' href={contributor.linkedIn} target="_blank" rel="noopener noreferrer">
                                <img src={linkedIn} alt="LinkedIn Icon" className="iconStyles" />
                            </a>
                        </span>
                    ))}
                </div>
                <div className='feedback pr4 mb1 '>
                    <a className="black pr2 hover-white " href="about">About</a>
                    <a className="black hover-white" href="feedback">Feedback</a>
                </div>
            </div>
        </footer>
    )
}
export default Footer
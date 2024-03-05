// import grass from '../assets/Green-grass-clipart-free-pictures.png'
import github from '../assets/Github-icon.png'
import linkedIn from '../assets/LI-icon.png'
import grass from '../assets/Green-grass-clipart-free-pictures.png'
import grassMobile from '../assets/Green-grass-clipart-free-pictures-mobile.png'
import '../styles/components/footer.scss'

function Footer() {
    const contributors = [
        { name: 'Jasvinder Saini', github: 'https://github.com/jsaini1727', linkedIn: 'https://www.linkedin.com/in/jasvinder-saini2769/' },
        { name: 'Jeremy McKeegan', github: 'https://github.com/jman2476', linkedIn: 'https://www.linkedin.com/in/jeremy-mckeegan-241a842aa/' },
        { name: 'Charles Swayne', github: 'https://github.com/cjswayne', linkedIn: 'https://www.linkedin.com/in/charles-swayne/' },
        { name: 'Shannon Tice', github: 'https://github.com/shannontice', linkedIn: 'https://www.linkedin.com/in/shannon-tice/' },
        { name: 'Winston James Jr', github: 'https://github.com/wintino5', linkedIn: 'https://www.linkedin.com/in/winston-james-jr/' },

    ];

    const backgroundStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundImage: `url(${grass})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'blur(3px)',
        zIndex: '-1',
    };

    const contentStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: '35px',
    }
    const contributorStyles = {
        listStyleType: 'none',
        lineHeight: 1,
        fontSize: '12px',
        color: 'black',
        display: 'flex',
        // alignItems: 'flex-end',
        marginLeft: '25px',
        // marginTop: '110px'
        flexDirection: 'column'
    }
    const iconStyles = {
        width: '15px',
        height: '15px',
        marginLeft: '5px',
    }

    const seeContributors = () => {

    }


    return (
        <footer>
            {/* <div className="backgroundStyles"></div> */}
            <div className="footer-overlay"></div>
            <div className="imgWrap">
                <img className="desktop" src={grass} alt="pic of grass"></img>
                <img className="mobile" src={grassMobile} />
            </div>
            <div className="contributors flex pl1 justify-between">
                <div className="flex flex-wrap f7 tl pl2 people">
                    {contributors.map((contributor, index) => (
                        <span className='flex pr3' key={index}>
                            <p className="ph0">{contributor.name}</p>
                            <a className='icons' href={contributor.github} target="_blank" rel="noopener noreferrer">
                                <img src={github} alt="GitHub Icon" className="iconStyles" />
                            </a>
                            <a className='icons' href={contributor.linkedIn} target="_blank" rel="noopener noreferrer">
                                <img src={linkedIn} alt="LinkedIn Icon" className="iconStyles" />
                            </a>
                        </span>
                    ))}
                </div>
                <div className='feedback pr4 mb1'>
                    <a className="black pr2" href="about">About</a><span></span>
                    <a className="black" href="feedback">Feedback</a>
                </div>
            </div>
            {/* <div className="contentStyles">
                <div className="contributeList">
                    <div className='feedback pr4'>
                        <a className="btn" href="about">About</a><span></span>
                        <a className="btn" href="feedback">Feedback</a>
                    </div>
                    {contributors.map((contributor, index) => (
                        <div className='contributorStyles contributor no-wrap' key={index}>
                            {contributor.name}
                            <div className='footStyle'>
                                <a className='icons' href={contributor.github} target="_blank" rel="noopener noreferrer">
                                    <img src={github} alt="GitHub Icon" className="iconStyles" />
                                </a>
                                <a className='icons' href={contributor.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <img src={linkedIn} alt="LinkedIn Icon" className="iconStyles" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </footer>
    )
}
export default Footer
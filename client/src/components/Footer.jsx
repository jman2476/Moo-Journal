// import grass from '../assets/Green-grass-clipart-free-pictures.png'
import github from '../assets/Github-icon.png'
import linkedIn from '../assets/LI-icon.png'

function Footer() {
    const contributors = [
        { name: 'Jasvinder Saini', github: 'https://github.com/jsaini1727', linkedIn: 'in/jasvinder-saini2769' },
        { name: 'Jeremy McKeegan', github: 'https://github.com/jman2476', linkedIn: 'in/' },
        { name: 'Charles Swayne', github: 'https://github.com/cjswayne', linkedIn: 'in/charles-swayne-42b277284' },
        { name: 'Shannon Tice', github: 'https://github.com/shannontice', linkedIn: 'in/' },
        { name: 'Winston James Jr', github: 'https://github.com/wintino5', linkedIn: 'in/winston-james-jr' },

    ];

    // const backgroundStyles = {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundImage: `url(${grass})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     filter: 'blur(3px)',
    //     zIndex: '-1',
    // };

    // contentStyles = {
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'flex-end',
    //     flexDirection: 'row',
    //     marginTop: '35px',
    // }
    // const contributorStyles = {
    //     listStyleType: 'none',
    //     lineHeight: 1,
    //     fontSize: '12px',
    //     color: 'black',
    //     display: 'flex',
    //     // alignItems: 'flex-end',
    //     marginLeft: '25px',
    //     // marginTop: '110px'
    //     flexDirection: 'column'
    // }
    // const iconStyles = {
    //     width: '15px',
    //     height: '15px',
    //     marginLeft: '5px',
    // }


    return (
        <footer style={{ position: 'absolute' }}>
            <div className="backgroundStyles"></div>
            <div className="contentStyles">
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
            </div>
        </footer>
    )
}
export default Footer
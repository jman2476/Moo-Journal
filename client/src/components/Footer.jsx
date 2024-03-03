import grass from '../assets/Green-grass-clipart-free-pictures.png'
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
    const footerStyles = {
        position: 'absolute',
        backgroundImage: `url(${grass})`,
        backgroundSize: 'cover',
    };

    const contentStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection:'row',
    }
    const contributorStyles = {
        listStyleType: 'none',
        lineHeight: 1,
        color: 'black',
        display: 'flex',
        alignItems: 'flex-end',
        marginLeft: '25px',
        marginTop: '70px'
    }
    const iconStyles = {
        width: '20px',
        height: '20px',
        marginLeft: '15px',
    }

    return (
        <footer style={footerStyles}>
            <div style={contentStyles}>
                <li style={contributorStyles} className='contributor no-wrap'>
                    {contributors.map((contributor, index) => (
                        <ul style={contributorStyles} className='contributor no-wrap'key={index}>
                            {contributor.name}
                            <a className='icons' href={contributor.github} target="_blank" rel="noopener noreferrer">
                                <img src={github} alt="GitHub Icon" style={iconStyles} />
                            </a>
                            <a className='icons' href={contributor.linkedIn} target="_blank" rel="noopener noreferrer">
                                <img src={linkedIn} alt="LinkedIn Icon" style={iconStyles} />

                            </a>
                        </ul>
                    ))}
                </li>
                <div className='feedback'>
                    <a href="#about">  About</a> | <a href="#feedback">  Feedback  </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
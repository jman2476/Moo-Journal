import grass from '../assets/Green-grass-clipart-free-pictures.png'
import github from '../assets/Github-icon.png'
import linkedIn from '../assets/LI-icon.png'

function Footer() {
    const contributors = [
        { name: 'Charles Swayne', github: 'https://github.com/cjswayne', linkedIn: 'in/charles-swayne-42b277284' },
        { name: 'Jeremy McKeegan', github: 'https://github.com/jman2476', linkedIn: 'in/' },
        { name: 'Shannon Tice', github: 'https://github.com/shannontice', linkedIn: 'in/' },
        { name: 'Winston James Jr', github: 'https://github.com/wintino5', linkedIn: 'in/' },
        { name: 'Jasvinder Saini', github: 'https://github.com/jsaini1727', linkedIn: 'in/' },

    ];
    const footerStyles = {
        position: 'absolute',
        backgroundImage: `url(${grass})`,
        backgroundSize: 'cover',

    };
    const contributorStyles = {
        listStyleType: 'none',
        padding: '5px',
        fontWeight: 'bold',
        color: 'black'
    };
    const iconStyles = {
        width: '20px',
        height: '20px',
        margin: '2px',
    }

    return (
        <footer style={footerStyles}>

            <div>
                <ul style={contributorStyles} className='contributor fl w-25'>
                    {contributors.map((contributor, index) => (
                        <li className="nowrap flex items-center" key={index}>
                            {contributor.name}
                            <div className='icons'>
                                <a href={contributor.github} target="_blank" rel="noopener noreferrer">
                                    <img src={github} alt="GitHub Icon" style={iconStyles} />
                                </a>
                                <a href={contributor.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <img src={linkedIn} alt="LinkedIn Icon" style={iconStyles} />

                                </a>
                            </div>

                        </li>
                    ))}
                </ul>
                <div className='feedback'>
                    <a href="#about">  About</a> | <a href="#feedback">  Feedback  </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
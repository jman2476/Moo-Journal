import grass from '../assets/Green-grass-clipart-free-pictures.png'

function Footer() {
    const contributors = [
        { name: 'Charles Swayne', github: 'https://github.com/cjswayne', linkedIn: 'in/charles-swayne-42b277284' },
        { name: 'Jeremy McKeegan', github: 'https://github.com/jman2476', linkedIn: 'in/' },
        { name: 'Shannon Tice', github: 'https://github.com/shannontice', linkedIn: 'in/' },
        { name: 'Winston Jr James', github: 'https://github.com/', linkedIn: 'in/' },
        { name: 'Jasvinder Saini', github: 'https://github.com/jsaini1727', linkedIn: 'in/' },

    ];
    const footerStyles = {
        position: 'absolute',
        backgroundImage: `url(${grass})`,
        backgroundSize: 'cover',
        opacity: 0.6,
    };
    const contributorStyles = {
        listStyleType: 'none',
        padding: '10px',
        fontWeight: 'bold',
    };

    return (
        <footer style={footerStyles}>
            {/* The image is included as a background in the const footerStyles */}
            {/* <img 
            src={grass} 
            alt="Grass"></img> */}
            <div>
                <ul style={contributorStyles} className='contributor text-center fl w-100'>
                    {contributors.map((contributor, index) => (
                        <ul key={index}>
                            <a href={contributor.github} target="_blank" rel="noopener noreferrer">{contributor.name}</a> -
                            <a href={contributor.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </ul>
                    ))}
                </ul>
                <div>
                    <a href="#about">About</a> | <a href="#feedback">Feedback</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
import cowPic from '../assets/cow-hp-bg.jpg';




function CowPatternBg(){
    return (
        <>
            <div className="cow-pattern-backdrop">
                <img src={cowPic} alt="Background" className="cow-pattern-image" />
                <img src={cowPic} alt="Background" className="cow-pattern-image" />
            </div>
            <style>{`
                @keyframes slide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); } // Moves the container to show the second image, then resets
                }
                body{
                    overflow:hidden;
                }
            `}</style>
        </>
    )
}

export default CowPatternBg
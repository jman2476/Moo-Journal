import CowPatternBg from "../components/CowPatternBg";
import '../styles/pages/aboutPage.scss';

// page to explain the app and the reasons why(mental health)
function About() {
    return (
        <>
            <CowPatternBg />
            <div className="text-box">
                <h2 className="title-text">Let's
                    <span className="mj-text"> Moo</span>
                    -ve Toward Mental Well-Being! </h2>

    
                <p className="indented-text">
                    Welcome to our app, a safe haven for your thoughts and emotions. In a world full of noise, take a moment to find your voice here. Let your feelings flow freely onto the pages of your digital journal. Whether it's joy, anger, sadness, or confusion, each entry is a step towards understanding and healing.<br /><br />
                    <div className="indented-text">
                    We understand the weight that burdens the mind. That's why we're here to offer a listening ear, a virtual shoulder to lean on. Our resources are here not just to guide, but to accompany you on your journey towards mental well-being. You're not alone in this struggle, and together, we can navigate the twists and turns of life's challenges. Take the first step towards a lighter heart and a clearer mind. START YOUR JOURNEY WITH US TODAY!
                    </div>
                    
                </p>
            </div>
        </>
    );
}

export default About;
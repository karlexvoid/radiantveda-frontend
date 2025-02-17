import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to handle button click and navigate to the questionnaire page
    const goToQuestionnaire = () => {
        navigate("/questionnaire"); // Navigate to the questionnaire page
    };
    return (
        <div className="homepageMainDiv">
            {/* Heading */}
            {/* <h1 className="text-4xl font-bold text-pink-700 mb-10">Welcome to Radiant Veda</h1> */}

            {/* Main Section */}
            <div className="homepageInnerDiv">
                {/* Left Section - Text & Button */}
                <div className="homepageLeftDiv">
                    <p className="homepageText">
                        Fill up your questionnaire and get insights about your skincare routine with AI.
                    </p>
                    <button onClick={goToQuestionnaire}>
                        Fill Questionnaire
                    </button>
                </div>

                {/* Right Section - Image */}
                <div>
                    <img 
                        src="./hero.webp" 
                        alt="Skincare AI Routine" 
                        className="heroImage"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;

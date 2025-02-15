import { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Questionnaire() {
    const [skinType, setSkinType] = useState('');
    const [skinSensitivity, setSkinSensitivity] = useState('');
    const [concerns, setConcerns] = useState([]);
    const [breakouts, setBreakouts] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [ayurveda, setAyurveda] = useState('');
    const [skinGoal, setSkinGoal] = useState('');
    const [sunscreen, setSunscreen] = useState('');
    const [sleep, setSleep] = useState('');
    const [activeIngredients, setActiveIngredients] = useState('');
    const [activeIngredientsText, setActiveIngredientsText] = useState('');
    const [allergies, setAllergies] = useState('');
    const [allergiesText, setAllergiesText] = useState('');
    const [skinConditions, setSkinConditions] = useState('');
    const [skinConditionsText, setSkinConditionsText] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const navigate = useNavigate(); 

    // Handle radio and checkbox changes for each question
    const handleChange = (setter) => (event) => setter(event.target.value);

    const handleConcernsChange = (event) => {
        const { value, checked } = event.target;
        setConcerns((prevConcerns) => 
            checked ? [...prevConcerns, value] : prevConcerns.filter((concern) => concern !== value)
        );
    };

    const handleTextInputChange = (setter) => (event) => setter(event.target.value);

    // Navigation functions
    const goToNextStep = () => setCurrentStep(currentStep + 1);
    const goToPreviousStep = () => setCurrentStep(currentStep - 1);

    // Handle form submission
    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log({
            skinType,
            skinSensitivity,
            concerns,
            breakouts,
            ageGroup,
            ayurveda,
            skinGoal,
            sunscreen,
            sleep,
            activeIngredients,
            allergies,
            skinConditions,
        });

        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/questionaire/submit`;
        const data = { 
                        skinType,
                        skinSensitivity,
                        concerns,
                        breakouts,
                        ageGroup,
                        ayurveda,
                        skinGoal,
                        sunscreen,
                        sleep,
                        activeIngredients,
                        allergies,
                        skinConditions,
                    };
        try {
            const response = await axios.post(endpoint, data, {
                headers: {
                    "Content-Type": "application/json", // Ensure server recognizes JSON
                    "x-auth-token": localStorage.getItem("token"), // Ensure token is stored
                },
            });
            if(response.data.status_code){
               console.log(response)
                toast.success(
                    response.data.status_code == 1
                        ? "Questionnaire updated successfully" 
                        : "Questionnaire created successfully",
                        {
                            position: "top-right", // Corrected position
                            autoClose: 1000, // Closes after 3 seconds
                            hideProgressBar: true, // Removes progress bar for a smoother feel
                            closeOnClick: true, 
                            pauseOnHover: true,
                            draggable: true
                        }
                    );
                    navigate("/routine");
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle errors and display appropriate messages
            setErrorMessage(
                error.response?.data?.message || "An unexpected error occurred."
            );
        }
    };

    return (
        <div className="questionnaire">
            <h2>Find Your Beauty Routine</h2>
            <form onSubmit={handleSubmit}>

                {/* Step 1: Skin Type */}
                {currentStep === 1 && (
                    <div>
                        <label>What is your skin type?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="oily" 
                                name="skinType" 
                                value="Oily" 
                                checked={skinType === "Oily"} 
                                onChange={handleChange(setSkinType)} 
                            />
                            <label htmlFor="oily">Oily</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="dry" 
                                name="skinType" 
                                value="Dry" 
                                checked={skinType === "Dry"} 
                                onChange={handleChange(setSkinType)} 
                            />
                            <label htmlFor="dry">Dry</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="combination" 
                                name="skinType" 
                                value="Combination" 
                                checked={skinType === "Combination"} 
                                onChange={handleChange(setSkinType)} 
                            />
                            <label htmlFor="combination">Combination</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="normal" 
                                name="skinType" 
                                value="Normal" 
                                checked={skinType === "Normal"} 
                                onChange={handleChange(setSkinType)} 
                            />
                            <label htmlFor="normal">Normal</label>
                        </div>
                    </div>
                )}

                {/* Step 2: Skin Sensitivity */}
                {currentStep === 2 && (
                    <div>
                        <label>How sensitive is your skin?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="verySensitive" 
                                name="skinSensitivity" 
                                value="Very Sensitive" 
                                checked={skinSensitivity === "Very Sensitive"} 
                                onChange={handleChange(setSkinSensitivity)} 
                            />
                            <label htmlFor="verySensitive">Very Sensitive</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="slightlySensitive" 
                                name="skinSensitivity" 
                                value="Slightly Sensitive" 
                                checked={skinSensitivity === "Slightly Sensitive"} 
                                onChange={handleChange(setSkinSensitivity)} 
                            />
                            <label htmlFor="slightlySensitive">Slightly Sensitive</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="notSensitive" 
                                name="skinSensitivity" 
                                value="Not Sensitive" 
                                checked={skinSensitivity === "Not Sensitive"} 
                                onChange={handleChange(setSkinSensitivity)} 
                            />
                            <label htmlFor="notSensitive">Not Sensitive</label>
                        </div>
                    </div>
                )}

                {/* Step 3: Skin Concerns */}
                {currentStep === 3 && (
                    <div>
                        <label>What is your main skin concern?</label>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Acne" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Acne</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Dark Spots" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Dark Spots</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Dryness" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Dryness</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Fine Lines & Wrinkles" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Fine Lines & Wrinkles</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Uneven Tone" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Uneven Tone</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Puffiness" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Puffiness</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                value="Redness/Irritation" 
                                onChange={handleConcernsChange} 
                            />
                            <label>Redness/Irritation</label>
                        </div>
                    </div>
                )}

                {/* Step 4: Breakouts */}
                {currentStep === 4 && (
                    <div>
                        <label>Do you experience breakouts?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="frequent" 
                                name="breakouts" 
                                value="Yes, frequently" 
                                checked={breakouts === "Yes, frequently"} 
                                onChange={handleChange(setBreakouts)} 
                            />
                            <label htmlFor="frequent">Yes, frequently</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="occasionally" 
                                name="breakouts" 
                                value="Occasionally" 
                                checked={breakouts === "Occasionally"} 
                                onChange={handleChange(setBreakouts)} 
                            />
                            <label htmlFor="occasionally">Occasionally</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="rarely" 
                                name="breakouts" 
                                value="Rarely" 
                                checked={breakouts === "Rarely"} 
                                onChange={handleChange(setBreakouts)} 
                            />
                            <label htmlFor="rarely">Rarely</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="never" 
                                name="breakouts" 
                                value="Never" 
                                checked={breakouts === "Never"} 
                                onChange={handleChange(setBreakouts)} 
                            />
                            <label htmlFor="never">Never</label>
                        </div>
                    </div>
                )}

                {/* Step 5: Age Group */}
                {currentStep === 5 && (
                    <div>
                        <label>What is your age group?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="under20" 
                                name="ageGroup" 
                                value="Under 20" 
                                checked={ageGroup === "Under 20"} 
                                onChange={handleChange(setAgeGroup)} 
                            />
                            <label htmlFor="under20">Under 20</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="21to30" 
                                name="ageGroup" 
                                value="21–30" 
                                checked={ageGroup === "21–30"} 
                                onChange={handleChange(setAgeGroup)} 
                            />
                            <label htmlFor="21to30">21–30</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="31to40" 
                                name="ageGroup" 
                                value="31–40" 
                                checked={ageGroup === "31–40"} 
                                onChange={handleChange(setAgeGroup)} 
                            />
                            <label htmlFor="31to40">31–40</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="41to50" 
                                name="ageGroup" 
                                value="41–50" 
                                checked={ageGroup === "41–50"} 
                                onChange={handleChange(setAgeGroup)} 
                            />
                            <label htmlFor="41to50">41–50</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="51plus" 
                                name="ageGroup" 
                                value="51+" 
                                checked={ageGroup === "51+"} 
                                onChange={handleChange(setAgeGroup)} 
                            />
                            <label htmlFor="51plus">51+</label>
                        </div>
                    </div>
                )}

                {/* Step 6: Ayurveda Interest */}
                {currentStep === 6 && (
                    <div>
                        <label>Are you interested in Ayurveda-based skincare recommendations?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="yes" 
                                name="ayurveda" 
                                value="Yes" 
                                checked={ayurveda === "Yes"} 
                                onChange={handleChange(setAyurveda)} 
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="no" 
                                name="ayurveda" 
                                value="No" 
                                checked={ayurveda === "No"} 
                                onChange={handleChange(setAyurveda)} 
                            />
                            <label htmlFor="no">No</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="maybe" 
                                name="ayurveda" 
                                value="Maybe" 
                                checked={ayurveda === "Maybe"} 
                                onChange={handleChange(setAyurveda)} 
                            />
                            <label htmlFor="maybe">Maybe</label>
                        </div>
                    </div>
                )}
  {/* Step 7: Skin Goal */}
  {currentStep === 7 && (
                    <div>
                        <label>What is your primary skin goal?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="clearerSkin" 
                                name="skinGoal" 
                                value="Clearer Skin" 
                                checked={skinGoal === "Clearer Skin"} 
                                onChange={handleChange(setSkinGoal)} 
                            />
                            <label htmlFor="clearerSkin">Clearer Skin</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="antiAging" 
                                name="skinGoal" 
                                value="Anti-Aging" 
                                checked={skinGoal === "Anti-Aging"} 
                                onChange={handleChange(setSkinGoal)} 
                            />
                            <label htmlFor="antiAging">Anti-Aging</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="hydration" 
                                name="skinGoal" 
                                value="Hydration" 
                                checked={skinGoal === "Hydration"} 
                                onChange={handleChange(setSkinGoal)} 
                            />
                            <label htmlFor="hydration">Hydration</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="brightening" 
                                name="skinGoal" 
                                value="Brightening" 
                                checked={skinGoal === "Brightening"} 
                                onChange={handleChange(setSkinGoal)} 
                            />
                            <label htmlFor="brightening">Brightening</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="skinRepair" 
                                name="skinGoal" 
                                value="Skin Repair" 
                                checked={skinGoal === "Skin Repair"} 
                                onChange={handleChange(setSkinGoal)} 
                            />
                            <label htmlFor="skinRepair">Skin Repair</label>
                        </div>
                    </div>
                )}

                {/* Step 8: Sunscreen Usage */}
                {currentStep === 8 && (
                    <div>
                        <label>Do you wear sunscreen regularly?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="everyday" 
                                name="sunscreen" 
                                value="Yes, every day" 
                                checked={sunscreen === "Yes, every day"} 
                                onChange={handleChange(setSunscreen)} 
                            />
                            <label htmlFor="everyday">Yes, every day</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="occasionally" 
                                name="sunscreen" 
                                value="Occasionally" 
                                checked={sunscreen === "Occasionally"} 
                                onChange={handleChange(setSunscreen)} 
                            />
                            <label htmlFor="occasionally">Occasionally</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="rarely" 
                                name="sunscreen" 
                                value="Rarely" 
                                checked={sunscreen === "Rarely"} 
                                onChange={handleChange(setSunscreen)} 
                            />
                            <label htmlFor="rarely">Rarely</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="never" 
                                name="sunscreen" 
                                value="Never" 
                                checked={sunscreen === "Never"} 
                                onChange={handleChange(setSunscreen)} 
                            />
                            <label htmlFor="never">Never</label>
                        </div>
                    </div>
                )}

                {/* Step 9: Sleep */}
                {currentStep === 9 && (
                    <div>
                        <label>How much sleep do you get on average each night?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="lessThan5" 
                                name="sleep" 
                                value="Less than 5 hours" 
                                checked={sleep === "Less than 5 hours"} 
                                onChange={handleChange(setSleep)} 
                            />
                            <label htmlFor="lessThan5">Less than 5 hours</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="5to6" 
                                name="sleep" 
                                value="5–6 hours" 
                                checked={sleep === "5–6 hours"} 
                                onChange={handleChange(setSleep)} 
                            />
                            <label htmlFor="5to6">5–6 hours</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="7to8" 
                                name="sleep" 
                                value="7–8 hours" 
                                checked={sleep === "7–8 hours"} 
                                onChange={handleChange(setSleep)} 
                            />
                            <label htmlFor="7to8">7–8 hours</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="moreThan8" 
                                name="sleep" 
                                value="More than 8 hours" 
                                checked={sleep === "More than 8 hours"} 
                                onChange={handleChange(setSleep)} 
                            />
                            <label htmlFor="moreThan8">More than 8 hours</label>
                        </div>
                    </div>
                )}
   {/* Step 10: Active Ingredients */}
   {currentStep === 10 && (
                    <div>
                        <label>Do you use any active ingredients in your skincare (e.g., retinol, salicylic acid)?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="activeYes" 
                                name="activeIngredients" 
                                value="Yes" 
                                checked={activeIngredients === "Yes"} 
                                onChange={handleChange(setActiveIngredients)} 
                            />
                            <label htmlFor="activeYes">Yes</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="activeNo" 
                                name="activeIngredients" 
                                value="No" 
                                checked={activeIngredients === "No"} 
                                onChange={handleChange(setActiveIngredients)} 
                            />
                            <label htmlFor="activeNo">No</label>
                        </div>
                        {activeIngredients === "Yes" && (
                            <div>
                                <label>If yes, please specify:</label>
                                <input 
                                    type="text" 
                                    value={activeIngredientsText} 
                                    onChange={handleTextInputChange(setActiveIngredientsText)} 
                                />
                            </div>
                        )}
                    </div>
                )}

             {/* Step 11: Allergies */}
             {currentStep === 11 && (
                    <div>
                        <label>Do you have any allergies to skincare ingredients?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="allergyYes" 
                                name="allergies" 
                                value="Yes" 
                                checked={allergies === "Yes"} 
                                onChange={handleChange(setAllergies)} 
                            />
                            <label htmlFor="allergyYes">Yes</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="allergyNo" 
                                name="allergies" 
                                value="No" 
                                checked={allergies === "No"} 
                                onChange={handleChange(setAllergies)} 
                            />
                            <label htmlFor="all ergyNo">No</label>
                        </div>
                        {allergies === "Yes" && (
                            <div>
                                <label>If yes, please specify:</label>
                                <input 
                                    type="text" 
                                    value={allergiesText} 
                                    onChange={handleTextInputChange(setAllergiesText)} 
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Step 12: Skin Conditions */}
                {currentStep === 12 && (
                    <div>
                        <label>Do you have any existing skin conditions (e.g., eczema, psoriasis)?</label>
                        <div>
                            <input 
                                type="radio" 
                                id="conditionYes" 
                                name="skinConditions" 
                                value="Yes" 
                                checked={skinConditions === "Yes"} 
                                onChange={handleChange(setSkinConditions)} 
                            />
                            <label htmlFor="conditionYes">Yes</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id="conditionNo" 
                                name="skinConditions" 
                                value="No" 
                                checked={skinConditions === "No"} 
                                onChange={handleChange(setSkinConditions)} 
                            />
                            <label htmlFor="conditionNo">No</label>
                        </div>
                        {skinConditions === "Yes" && (
                            <div>
                                <label>If yes, please specify:</label>
                                <input 
                                    type="text" 
                                    value={skinConditionsText} 
                                    onChange={handleTextInputChange(setSkinConditionsText)} 
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="questionareButtonsDiv">
                    {currentStep > 1 && <button type="button" onClick={goToPreviousStep}>Go Back</button>}
                    {currentStep < 12 ? (
                        <button type="button" onClick={goToNextStep}>Next</button>
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Questionnaire;
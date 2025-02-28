import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// import "../assets/styles/Routine.css";
const Skinconcern = () => {
    const [questionnaire, setQuestionnaire] = useState(null);
    const [routine, setRoutine] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/questionaire/fetch`, {
                    headers: { "x-auth-token": token }
                });
                setQuestionnaire(response.data);
            } catch (error) {
                console.log(error.status)
                if(error.status==401){
                    toast.warning("Looks like you session has expired , please log in again!");
                }
                console.error("Error fetching questionnaire:", error);
            }
        };

        fetchQuestionnaire();
    }, []);

    const generateRoutine = async () => {
        if (!questionnaire) return toast.warning("Complete your questionnaire first!");

        setLoading(true);
        try {
            const prompt = `
                Based on the following skincare details, generate a personalized skin concern solutions:
                - Age Group: ${questionnaire.ageGroup}
                - Skin Type: ${questionnaire.skinType}
                - Skin Sensitivity: ${questionnaire.skinSensitivity}
                - Skin Goals: ${questionnaire.skinGoal}
                - Breakouts: ${questionnaire.breakouts}
                - Allergies: ${questionnaire.allergies}
                - Sleep: ${questionnaire.sleep}
                - Sunscreen Usage: ${questionnaire.sunscreen}
                - Ayurveda Preference: ${questionnaire.ayurveda}
                
                ### **Response Format (Strictly follow this format and include nothing else)**:

                    **Your skin**
                    a short paragraph of the skin is based on the info provided

                    **Skin Concern Solutions:**
                    1. [concern]: [solution]
                    2. [concern ]: [solution]
                    3. [concern]: [solution]
                    ..... steps can be more if required

                    **Rules:**
                    - Do NOT add any disclaimers or introductory text.
                    - Do NOT provide any product suggestions.
                    - Do NOT include any text outside the specified format.
                    - Ensure each step is concise and to the point.

                    Now generate the skin concern solution in the exact format above.
            `;

            const aiResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: prompt }] }]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            const responseText = aiResponse.data.candidates[0].content.parts[0].text;
            setRoutine(parseRoutine(responseText));

        } catch (error) {
            console.error("Error generating routine:", error);
        } finally {
            setLoading(false);
        }
    };

    const parseRoutine = (text) => {
        const lines = text.split("\n");
        const sections = [];
        let currentSection = null;

        lines.forEach((line) => {
            if (line.trim() === "") return;

            if (line.startsWith("**") && line.endsWith("**")) {
                if (currentSection) sections.push(currentSection);
                currentSection = { title: line.replace(/\*\*/g, ""), content: [] };
            } else if (line.match(/^\d+\./)) {
                currentSection?.content.push({ type: "list", text: line });
            } else {
                currentSection?.content.push({ type: "paragraph", text: line });
            }
        });

        if (currentSection) sections.push(currentSection);
        return sections;
    };

    return (
        <div className="questionnaire">
        <div className="routine-container">
            <h2>Skin Concern Solutions</h2>
            {routine ? (
                <div className="routine-content">
                    {routine.map((section, index) => (
                        <div key={index} className="routine-section">
                            <h3>{section.title}</h3>
                            {section.content.map((item, idx) =>
                                item.type === "list" ? (
                                    <p key={idx}>
                                        {item.text}
                                    </p>
                                ) : (
                                    <p key={idx}>{item.text}</p>
                                )
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <button onClick={generateRoutine} disabled={loading}>
                    {loading ? "Generating..." : "Generate Skin Concern Solutions"}
                </button>
            )}
        </div>
        </div>
    );
};

export default Skinconcern;

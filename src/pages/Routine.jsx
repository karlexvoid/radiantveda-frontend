import React, { useEffect, useState } from "react";
import axios from "axios";

const Routine = () => {
    const [questionnaire, setQuestionnaire] = useState(null);
    const [routine, setRoutine] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const token = localStorage.getItem("token"); // Get auth token
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/questionaire/fetch`, {
                    headers: { "x-auth-token": token }
                });
                setQuestionnaire(response.data);
            } catch (error) {
                console.error("Error fetching questionnaire:", error);
            }
        };

        fetchQuestionnaire();
    }, []);

    const generateRoutine = async () => {
        if (!questionnaire) return alert("Complete your questionnaire first!");

        setLoading(true);
        try {
            const prompt = `
                Based on the following skincare details, generate a personalized skincare routine:
                - Age Group: ${questionnaire.ageGroup}
                - Skin Type: ${questionnaire.skinType}
                - Skin Sensitivity: ${questionnaire.skinSensitivity}
                - Skin Goals: ${questionnaire.skinGoal}
                - Breakouts: ${questionnaire.breakouts}
                - Allergies: ${questionnaire.allergies}
                - Sleep: ${questionnaire.sleep}
                - Sunscreen Usage: ${questionnaire.sunscreen}
                - Ayurveda Preference: ${questionnaire.ayurveda}
                
                Provide a structured morning and night routine with product suggestions.
            `;

            const aiResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: prompt }] }]
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            setRoutine(aiResponse.data.candidates[0].content.parts[0].text);

        } catch (error) {
            console.error("Error generating routine:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="questionnaire">
            <h2>Skincare Routine</h2>
            {routine ? (
                <pre>{routine}</pre>
            ) : (
                <button onClick={generateRoutine} disabled={loading}>
                    {loading ? "Generating..." : "Generate Routine"}
                </button>
            )}
        </div>
    );
};

export default Routine;

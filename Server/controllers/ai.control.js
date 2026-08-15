import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateCourse = async (req, res) => {
    try {
        const {
            prompt,
            currentCourse,
            isInitialGeneration,
        } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        let aiPrompt;
        let responseSchema;

        // =====================================================
        // FIRST GENERATION
        // Title + Category already came from Add Course
        // =====================================================

        if (isInitialGeneration) {
            aiPrompt = `
You are an AI course creator for a Learning Management System.

The course title and category have ALREADY been provided by the user.

Current course information:

${JSON.stringify(currentCourse, null, 2)}

The user wants to create the remaining course details based on this request:

"${prompt}"

IMPORTANT RULES:

1. DO NOT change the courseTitle.
2. DO NOT generate a new courseTitle.
3. DO NOT change the category.
4. DO NOT generate a new category.
5. Generate a professional subtitle.
6. Generate a useful and detailed course description.
7. Generate an appropriate course level.
8. courseLevel MUST be exactly one of:
   Beginner, Intermediate, Advanced.
9. Return ONLY these three fields:
   subTitle
   description
   courseLevel
10. Do NOT return courseTitle.
11. Do NOT return category.
12. Do NOT add any other fields.

Return ONLY a valid JSON object.
`;

            responseSchema = {
                type: "object",
                properties: {
                    subTitle: {
                        type: "string",
                    },

                    description: {
                        type: "string",
                    },

                    courseLevel: {
                        type: "string",
                        enum: [
                            "Beginner",
                            "Intermediate",
                            "Advanced",
                        ],
                    },
                },

                required: [
                    "subTitle",
                    "description",
                    "courseLevel",
                ],
            };
        }

        // =====================================================
        // EDIT EXISTING COURSE
        // Only change fields mentioned in the prompt
        // =====================================================

        else if (currentCourse) {
            aiPrompt = `
You are an AI course editor for a Learning Management System.

Here is the CURRENT course:

${JSON.stringify(currentCourse, null, 2)}

The user wants to modify the course using this instruction:

"${prompt}"

Your job is to determine EXACTLY which course fields the user wants to change.

IMPORTANT RULES:

1. ONLY change fields explicitly requested by the user.
2. Return ONLY the fields that need to be changed.
3. DO NOT return unchanged fields.
4. DO NOT regenerate the entire course.
5. If the user says:
   "change only the description"

   return ONLY:

   {
     "description": "..."
   }

6. If the user asks to change the title and description, return ONLY:

   {
     "courseTitle": "...",
     "description": "..."
   }

7. Keep every field that the user did not mention completely unchanged.
8. Do not add new fields.
9. courseLevel, if changed, MUST be one of:
   Beginner, Intermediate, Advanced.
10. category should ONLY be returned if the user explicitly asks to change the category.
11. courseTitle should ONLY be returned if the user explicitly asks to change the title.
12. subTitle should ONLY be returned if the user explicitly asks to change the subtitle.
13. description should ONLY be returned if the user explicitly asks to change or improve the description.
14. courseLevel should ONLY be returned if the user explicitly asks to change the course level.
15. If the user asks to improve a field, modify ONLY that field.
16. Do not change the meaning of fields that were not requested.
17. Return ONLY a valid JSON object.
18. Do NOT return explanations.
19. Do NOT return markdown.
20. Do NOT return fields that were not requested.

Return ONLY the fields that need to be changed.
`;

            responseSchema = {
                type: "object",

                properties: {
                    courseTitle: {
                        type: "string",
                    },

                    subTitle: {
                        type: "string",
                    },

                    description: {
                        type: "string",
                    },

                    courseLevel: {
                        type: "string",
                        enum: [
                            "Beginner",
                            "Intermediate",
                            "Advanced",
                        ],
                    },

                    category: {
                        type: "string",
                    },
                },
            };
        }

        // =====================================================
        // FALLBACK - NO CURRENT COURSE
        // =====================================================

        else {
            aiPrompt = `
You are an AI course creator for a Learning Management System.

The user wants to create a course based on this request:

"${prompt}"

Generate:

1. A professional course title.
2. A short and attractive subtitle.
3. A useful course description.
4. An appropriate course level.
5. An appropriate educational category.

courseLevel MUST be exactly one of:

Beginner, Intermediate, Advanced.

Return the complete course object.

Return ONLY valid JSON.
`;

            responseSchema = {
                type: "object",

                properties: {
                    courseTitle: {
                        type: "string",
                    },

                    subTitle: {
                        type: "string",
                    },

                    description: {
                        type: "string",
                    },

                    courseLevel: {
                        type: "string",
                        enum: [
                            "Beginner",
                            "Intermediate",
                            "Advanced",
                        ],
                    },

                    category: {
                        type: "string",
                    },
                },

                required: [
                    "courseTitle",
                    "subTitle",
                    "description",
                    "courseLevel",
                    "category",
                ],
            };
        }

        // =====================================================
        // GEMINI REQUEST
        // =====================================================

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents: aiPrompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const courseData = JSON.parse(response.text);

        return res.status(200).json({
            success: true,
            course: courseData,
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
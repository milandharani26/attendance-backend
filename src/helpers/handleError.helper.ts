import { Response } from "express"; // Ensure you import the Response type from express

const handleError = (res: Response, error: unknown, message: string): Response => {
    console.error(message, error);

    if (error instanceof Error) {
        return res.status(500).json({
            status: "Failure",
            message: message,
            error: error.message, // Send detailed error message
        });
    }

    return res.status(500).json({
        status: "Failure",
        message: message,
        error: "Unknown error occurred", // Fallback for unknown errors
    });
};

export default handleError;


// import { Response } from "express"; // Ensure you import the Response type from express

// const handleError = (res: Response, error: unknown, message: string): void => {
//     console.error(message, error);

//     if (error instanceof Error) {
//         res.status(500).json({
//             status: "Failure",
//             message: message,
//             error: error.message, // Send detailed error message
//         });
//     }else{
//         res.status(500).json({
//             status: "Failure",
//             message: message,
//             error: "Unknown error occurred", // Fallback for unknown errors
//         });
//     } 
// };

// export default handleError;


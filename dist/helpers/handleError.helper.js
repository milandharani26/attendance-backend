"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (res, error, message) => {
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
exports.default = handleError;

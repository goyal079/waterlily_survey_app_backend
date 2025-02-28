/**
 * Validation utility functions for application data
 */

// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone number validation
const isValidPhone = (phone) => {
    const phoneRegex = /^\+?1?\d{10,15}$/;
    return phoneRegex.test(phone);
};

// ZIP code validation
const isValidZipCode = (zipCode) => {
    const zipCodeRegex = /^\d{5}(-\d{4})?$/;
    return zipCodeRegex.test(zipCode);
};

// Date validation (must be in the past)
const isValidPastDate = (date) => {
    const inputDate = new Date(date);
    const today = new Date();
    return !isNaN(inputDate.getTime()) && inputDate < today;
};

// Smoking status validation
const isValidSmokingStatus = (status) => {
    const validStatuses = ['never', 'former', 'active'];
    return validStatuses.includes(status);
};

// Annual income validation
const isValidAnnualIncome = (income) => {
    return !isNaN(income) && income >= 0;
};

// Required fields validation
const hasRequiredFields = (data) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'zipCode', 'annualIncome'];
    return requiredFields.every(field => data[field]);
};

module.exports = {
    isValidEmail,
    isValidPhone,
    isValidZipCode,
    isValidPastDate,
    isValidSmokingStatus,
    isValidAnnualIncome,
    hasRequiredFields
}; 
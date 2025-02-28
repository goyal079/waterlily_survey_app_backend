const db = require("../../config/database");
const Application = db.Application;
const {
    isValidEmail,
    isValidPhone,
    isValidZipCode,
    isValidPastDate,
    isValidSmokingStatus,
} = require("../utils/validations");

// create new application
const create = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            zipCode,
            hasChronicConditions,
            chronicConditionDetails,
            smokingStatus,
            annualIncome,
            hasSavings,
            hasInsurance
        } = req.body;

        // Basic field validations
        if (!firstName || !lastName || !email || !phone || !dateOfBirth || !zipCode || !annualIncome) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Email validation
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Phone validation
        if (!isValidPhone(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format"
            });
        }

        // ZIP code validation
        if (!isValidZipCode(zipCode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ZIP code format"
            });
        }

        // Date validation
        if (!isValidPastDate(dateOfBirth)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date of birth - must be a valid past date"
            });
        }

        // Smoking status validation
        if (smokingStatus && !isValidSmokingStatus(smokingStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid smoking status"
            });
        }

        // Annual income validation
        if (isNaN(annualIncome) || annualIncome < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid annual income"
            });
        }

        // Check for existing email
        const existingApplication = await Application.findOne({ where: { email } });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "An application with this email already exists"
            });
        }

        // Create new application
        const newApplication = await Application.create({
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            zipCode,
            hasChronicConditions: hasChronicConditions || false,
            chronicConditionDetails: hasChronicConditions ? chronicConditionDetails : "N/A",
            smokingStatus: smokingStatus || 'never',
            annualIncome,
            hasSavings: hasSavings || false,
            hasInsurance: hasInsurance || false
        });

        return res.status(201).json({
            success: true,
            message: "Application created successfully",
            data: newApplication
        });

    } catch (error) {
        console.error("Error creating application:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


const getApplications = async (req, res) => {
    try {
      const applications = await Application.findAll({
        attributes: ['firstName','lastName', 'email', 'phone', 'dateOfBirth', 'zipCode', 'createdAt'],
        raw: true, // Return plain objects
      });
  
      return res.status(200).json({
        success: true,
        message: "Application created successfully",
        data: applications
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
  }
  

module.exports = { create, getApplications };

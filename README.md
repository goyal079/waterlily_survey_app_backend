# Long-term Care Survey Application

A backend service for collecting and managing long-term care planning survey applications.

## Quick Start

1. **Clone the repository**
```bash
git clone [repository-url]
cd [project-name]
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=survey_db
PORT=3000
```

4. **Start the server**
```bash
npm start
```

## API Endpoints

### Applications
- `POST /api/applications` - Submit new application
- `GET /api/applications/basic-info` - Retrieve all applications (basic info)

## Data Structure

### Application Fields
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  zipCode: String,
  hasChronicConditions: Boolean,
  chronicConditionDetails: String,
  smokingStatus: Enum['never', 'former', 'active'],
  annualIncome: Decimal,
  hasSavings: Boolean,
  hasInsurance: Boolean
}
```


## Validation Rules
- Email must be unique and valid format
- Phone: 10-15 digits (optional country code)
- ZIP: US format (5 digits or ZIP+4)
- Date: Valid past date
- Required fields: firstName, lastName, email, phone, dateOfBirth, zipCode, annualIncome

## Tech Stack
- Node.js
- Express
- Sequelize ORM
- PostgreSQL

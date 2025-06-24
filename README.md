# Test List Generator for Salesforce Marketing Cloud

A React application that simplifies generating comprehensive test data for Marketing Cloud campaigns.

## What It Does

The Test List Generator helps marketing teams safely test email campaigns by:

- **Sampling Production Data**: Extract real data combinations from live Data Extensions while replacing sensitive information with test values
- **Generating Proofing Lists**: Create synthetic test data with specific variance combinations for comprehensive scenario testing
- **Ensuring Safety**: Built-in guardrails prevent accidental sends to real customers and protect production data
- **Automating Complexity**: Eliminates hours of manual test data creation with guided workflows

## Architecture

### Frontend (React)
- **5-step guided workflow** with sub-step navigation
- **Custom hooks** for state management (`useProgress`, `useTestListConfig`, `useDataExtensionApi`)
- **Comprehensive test coverage** with React Testing Library
- **Modern UI/UX** with Tailwind CSS and your custom color palette

### Backend (Marketing Cloud Code Resource)
- **Query generation and execution** for production data sampling
- **Bulk data operations** for synthetic data insertion

## Technology Stack

- **Frontend**: React 18, Tailwind CSS, React Testing Library, Jest
- **Backend**: Marketing Cloud Server-Side JavaScript (SSJS)
- **APIs**: Marketing Cloud SOAP API, REST API integration
- **State Management**: React Context with custom hooks
- **Testing**: Test-Driven Development approach

## Prerequisites

### Required Access
- **Salesforce Marketing Cloud Enterprise Account** with:
  - Data Extension read/write permissions
  - Query creation and execution rights
  - Business unit access for target operations
  - Code Resource deployment capabilities

### Development Setup
- Node.js 16+ 
- npm or yarn package manager
- Modern browser with ES6+ support

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/test-list-generator.git
cd test-list-generator

# Install dependencies
npm install

# Start development server
npm start
```

### Development Mode (Mock API)
The application includes a comprehensive mock API for development and testing without Marketing Cloud access.

**Test with these example Data Extension external keys:**
- `46F82D8F-B4AA-4BD4-8151-F751448C6608` - Sample sendable DE with subscriber data
- `NOT_FOUND` - Triggers DE not found error
- `SERVER_ERROR` - Simulates server/network errors
- Empty string - Triggers missing external key validation

### Production Deployment
1. Deploy the React app to your hosting platform
2. Deploy the Code Resource to your Marketing Cloud instance  
3. Configure authentication tokens and security settings
4. Update API endpoints to point to your Code Resource

## Usage Workflow

### Step 1: Choose Strategy
Select between:
- **Sample Production Data** - Extract from live Data Extensions
- **Generate Proofing List** - Create synthetic test data

### Step 2: Select Data Extension
Search and choose your source/template Data Extension with built-in validation for minimum field requirements.

### Step 3: Configure Fields (Sub-steps)
- **3A**: Select variance fields (create multiple scenarios)  
- **3B**: Select test data fields (safe replacement values)

### Step 4: Input Data
- **Sample Mode**: Enter test replacement data
- **Proof Mode**: Enter variance combinations + test data (CSV format)

### Step 5: Review & Generate  
Review configuration, choose output options, and execute generation with safety confirmations.

## Security Features

- **Production Data Protection**: Never allows overwriting source production Data Extensions
- **Token-based Authentication**: Validates requests originate from authorized frontend
- **Rate Limiting**: Prevents API abuse and bulk unauthorized access
- **Origin Validation**: Restricts access to authorized domains
- **Sendable DE Safeguards**: Special handling for subscriber-sendable Data Extensions

## Testing

The project follows Test-Driven Development (TDD) principles:

```bash
# Run all tests
npm test

**Test Coverage Includes:**
- Custom hooks (`useProgress`, `useTestListConfig`, `useDataExtensionApi`)
- API service layer with mock implementations

## Project Structure

```
src/
├── components/
│   ├── layout/          # App header, progress indicators
│   ├── common/          # Shared UI components  
│   ├── steps/           # Step-specific components
│   │   ├── Step1ModeSelection/
│   │   ├── Step2DataExtensionSearch/
│   │   ├── Step3FieldConfiguration/
│   │   ├── Step4DataInput/
│   │   └── Step5ReviewGenerate/
│   └── navigation/      # Step navigation controls
├── hooks/               # Custom React hooks
├── services/            # API services and mocks
└── __tests__/          # Test files
```

## UI/UX Features

- **Progressive disclosure** - Shows relevant information at each step
- **Smart validation** - Real-time feedback with helpful error messages
- **Visual field management** - Clear indication of selected, disabled, and available fields
- **Responsive design** - Works across desktop and mobile devices
- **Modern aesthetics** - Custom color palette with smooth animations

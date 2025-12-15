#  Tabibak AI Medical Platform - Complete Documentation

**A comprehensive guide covering all pages, components, and API endpoints**

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Pages Documentation](#-pages-documentation)
3. [API Endpoints Configuration](#-api-endpoints-configuration)
4. [Design System](#-design-system)
5. [Navigation & Architecture](#-navigation--architecture)
6. [Setup & Deployment](#-setup--deployment)
7. [Security & Best Practices](#-security--best-practices)
8. [Troubleshooting](#-troubleshooting)

---

## 🎯 Project Overview

**طبيبك** (Your Doctor) is an AI-powered medical platform that serves two main user groups:

- **Doctors**: Advanced diagnostic tools with AI-powered image analysis and medical knowledge base
- **Patients**: Easy-to-use interface for understanding medical reports and asking health questions

### Key Features
✅ Medical Image Analysis (X-rays, CT scans, etc.)  
✅ AI-Powered Medical Question Answering  
✅ Grad-CAM Visualization for explainable AI  
✅ Multi-turn Conversational Interface  
✅ Arabic-Optimized UI  
✅ Real-time API Health Monitoring  

**Tech Stack**: React + TypeScript + Tailwind CSS + Multiple AI APIs

---

# 📄 Pages Documentation

## 1. HomePage.tsx

### Purpose
Landing page introducing the platform to new users with compelling features and call-to-action.

### File Location
`pages/HomePage.tsx`

### Key Sections

#### Hero Section
```tsx
- Title: "رعاية صحية ذكية في متناول يدك" (Smart Healthcare at Your Fingertips)
- Tagline: Explains how AI makes healthcare accessible
- CTA Button: "ابدأ رحلتك الصحية" → Routes to LoginPage
- Background: Professional healthcare imagery with overlay
```

#### Introduction Section
```tsx
- Topic: "Why Proactive Healthcare Matters"
- Left: Doctor-patient image
- Right: Benefits list with checkmarks
  • Simplified medical report explanations
  • 24/7 AI chatbot for health questions
  • Advanced tools for medical professionals
```

#### Features Section
Three flip-card animations showcasing:
1. **Medical Image Analysis**
   - CV-powered diagnosis from medical scans
   - Supports X-rays, CT scans, MRI images
   - Provides visualization with Grad-CAM

2. **RAG System** (Retrieval-Augmented Generation)
   - Medical knowledge base access
   - Context-aware responses
   - Multi-turn conversations

3. **Patient Portal**
   - Easy report uploads
   - AI explanations in Arabic
   - Follow-up questioning support

### Design
```
Colors:
  Primary: #1A2A4F (Dark Blue)
  Accent: #F7A5A5 (Rose)
  Background: #FFF2EF (Light Beige)

Animations:
  - fadeIn: Overall page entrance
  - slideInUp: Section content entrance
  - animation-delay-300/600: Staggered timing
  - Flip card hover: Feature showcase

Font: Cairo (Arabic-optimized)
```

### Navigation
```
HomePage
└── "ابدأ رحلتك الصحية" button
    └── onNavigate('login') → LoginPage
```

---

## 2. LoginPage.tsx

### Purpose
Role selection page where users choose between doctor and patient access.

### File Location
`pages/LoginPage.tsx`

### Layout
Dual card-based design with equal prominence for both roles:

#### Doctor Card
```tsx
- Image: Professional doctor photo
- Title: "أنا طبيب" (I'm a Doctor)
- Description: Access to diagnostic tools and patient management
- Button: "بوابة الطبيب" → Routes to 'doctor-dashboard'
- Hover Effect: Border color changes to primary, shadow increases
```

#### Patient Card
```tsx
- Image: Circular placeholder with "مريض" text
- Title: "أنا مريض" (I'm a Patient)
- Description: Understand health reports and ask health questions
- Button: "بوابة المريض" → Routes to 'patient-dashboard'
- Hover Effect: Border color changes to rose, shadow increases
```

### Interactive Features
```
✓ Smooth hover animations (-translate-y-3 upward movement)
✓ Border color transitions
✓ Shadow depth changes on hover
✓ Button color changes on hover (dark blue ↔ rose)
✓ Fully responsive (2 columns desktop, 1 column mobile)
```

### Design
```
Layout: grid md:grid-cols-2 gap-10
Colors:
  Doctor card border: Transparent → #1A2A4F on hover
  Patient card border: #F7A5A5 (pre-highlighted)
  Buttons: #1A2A4F → #F7A5A5 on hover

Responsive:
  Desktop (md+): 2 column grid
  Mobile: 1 column stack
```

---

## 3. PatientDashboard.tsx

### Purpose
Dashboard for patients to upload medical reports, get AI explanations, and chat about health concerns.

### File Location
`pages/PatientDashboard.tsx`

### Core Features

#### Report Upload System
```tsx
Input:
  - File format: Images (PNG, JPG, GIF, WebP)
  - Medical scans: X-rays, CT scans, ultrasound images
  - Supported: DICOM viewer integration ready

Processing:
  1. User selects/drags file
  2. File converted to base64
  3. Sent to Gemini Vision API
  4. Results returned in Arabic
  5. Results displayed in chat

Error Handling:
  - Unclear image: "واجهت مشكلة في قراءة صورة التقرير..."
  - Non-image file: "هذه الميزة تحت التطوير للملفات غير الصور"
```

#### Chat Interface
```tsx
Features:
  ✓ Multi-turn conversations
  ✓ Message history with role indicators (المريض / الذكي)
  ✓ Auto-scroll to latest message
  ✓ Context-aware responses
  ✓ Reassuring tone (temperature: 0.2)

Message History:
  - Keeps last 4 messages for context
  - Includes initial report explanation
  - Preserves conversation thread
```

### API Integration

#### Gemini Vision API
```
Purpose: Analyze medical images
Input: Base64-encoded image data
Output: Arabic explanation of findings
Prompt: "This is a patient's medical scan. Explain findings in simple Arabic..."
```

#### Shifaa API
```
Endpoint: https://5ab638cff76e.ngrok-free.app/ask
Method: POST
Parameters:
  - question: User's health question
  - max_length: 512 tokens
  - temperature: 0.2 (consistent responses)
Response: Medical answer with context

⚠️ NOTE: URL changes with each Colab restart!
```

### State Management
```tsx
const [report, setReport] = useState<string | null>(null);
// Base64-encoded medical image

const [reportName, setReportName] = useState<string>('');
// Original filename

const [isAnalyzingReport, setIsAnalyzingReport] = useState<boolean>(false);
// Loading state during Gemini analysis

const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
// Array of { role: 'user' | 'model', content: string }

const [userMessage, setUserMessage] = useState<string>('');
// Current text input

const [isChatting, setIsChatting] = useState<boolean>(false);
// Loading state during Shifaa API call
```

### User Flow
```
1. Patient opens PatientDashboard
2. Uploads medical report image
   ↓
3. Gemini analyzes and explains (Arabic)
   ↓
4. Patient sees explanation in chat
   ↓
5. Patient asks follow-up questions
   ↓
6. Shifaa API provides context-aware answers
   ↓
7. Conversation continues with full history
```

### Styling
```
Chat Bubbles:
  User (right): #F7A5A5 background
  Model (left): #E0E0E0 background
  
Container:
  Max height: scrollable
  Auto-scroll: smooth scroll to bottom
  
Responsive: Full width, adapts to screen size
```

---

## 4. DoctorDashboard.tsx

### Purpose
Professional dashboard for medical doctors to analyze images and access medical knowledge base.

### File Location
`pages/DoctorDashboard.tsx`

### Advanced Features

#### Medical Image Analysis
```tsx
Input:
  - Accepts medical scan images
  - Formats: PNG, JPG, JPEG, WEBP
  - Types: X-rays, CT scans, MRI, ultrasound

Processing Pipeline:
  1. Doctor uploads image
  2. Image sent to CV API
  3. Analysis performed
  4. Grad-CAM visualization generated
  5. Results displayed in professional format
```

#### Computer Vision API
```
Endpoint: https://waspier-rowen-semialcoholic.ngrok-free.dev/predict
Method: POST
Health Check: /health endpoint

Input:
  {
    "image": "base64_encoded_image_data"
  }

Output:
  {
    "predictions": "Detailed analysis results",
    "gradcam": "base64_encoded_heatmap",
    "confidence": 0.95,
    "findings": "Structured findings..."
  }

⚠️ NOTE: URL changes with each Colab restart!
```

#### Grad-CAM Visualization
```
What it shows:
  - Which image regions the AI focused on
  - Heatmap of important areas
  - Red/hot: High attention areas
  - Blue/cool: Low attention areas

Purpose:
  - Explainable AI for medical professionals
  - Verification of model decisions
  - Medical confidence assessment
```

#### Medical Knowledge Retrieval (RAG)
```
Purpose:
  - Query comprehensive medical database
  - Get evidence-based medical information
  - Support decision-making

Features:
  ✓ Multi-turn conversations
  ✓ Markdown-formatted responses
  ✓ Context preservation across messages
  ✓ Medical knowledge from trained models
```

#### RAG API (Medical Knowledge Base)
```
Endpoint: https://3fe64782a576.ngrok-free.app/ask
Method: POST
Health Check: /health endpoint

Input:
  {
    "query": "Medical question",
    "context": "Previous messages for context"
  }

Output (Markdown formatted):
  {
    "response": "## Analysis\n**Bold text** and *italic* supported..."
  }

Features:
  - Supports markdown formatting
  - Context-aware responses
  - Medical knowledge base queries

⚠️ NOTE: URL changes with each Colab restart!
```

#### Markdown Renderer Component
```tsx
// Custom component for formatting API responses

Supported Formatting:
  **bold text** → <strong>bold text</strong>
  *italic text* → <em>italic text</em>
  `code` → <code>code</code>
  # H1, ## H2, ### H3 → Headings
  - bullet items → Unordered lists
  1. numbered items → Ordered lists
  
Styling:
  Headings: #1A2A4F text, bold
  Code: Gray background with padding
  Lists: Proper spacing and formatting
```

#### API Health Monitoring
```tsx
Feature: Real-time API status checking

On Mount:
  1. Pings /health endpoint for RAG API
  2. Pings /health endpoint for CV API
  3. Sets status: 'online' | 'offline' | 'checking'

Display:
  - Green indicator: API online
  - Red indicator: API offline
  - Users can see connectivity status

States:
  'checking': Initial load
  'online': API responding (200 OK)
  'offline': API not responding
```

### State Management
```tsx
// Image Analysis
const [image, setImage] = useState(null);
// Current uploaded image

const [imageName, setImageName] = useState('');
// Filename for display

const [analysisResult, setAnalysisResult] = useState('');
// Text results from CV API

const [gradcamImage, setGradcamImage] = useState(null);
// Grad-CAM visualization (base64)

const [isAnalyzing, setIsAnalyzing] = useState(false);
// Loading state during analysis

// Medical Knowledge Chat
const [chatHistory, setChatHistory] = useState([]);
// Array of { role: 'user' | 'model', content: string }

const [userMessage, setUserMessage] = useState('');
// Current question input

const [isChatting, setIsChatting] = useState(false);
// Loading state during API call

// API Status
const [ragApiStatus, setRagApiStatus] = useState('checking');
// 'checking' | 'online' | 'offline'

const [cvApiStatus, setCvApiStatus] = useState('checking');
// 'checking' | 'online' | 'offline'
```

### Professional Features
```
For Medical Professionals:
  ✓ Side-by-side image and analysis
  ✓ Explainable AI with Grad-CAM
  ✓ Medical literature access via RAG
  ✓ Real-time API status monitoring
  ✓ Markdown-formatted medical references
  ✓ Multiple image analysis support
  ✓ Error handling and validation
```

### Typical Workflow
```
1. Doctor logs in → DoctorDashboard
2. Uploads medical scan image
   ↓
3. CV API analyzes image
4. Grad-CAM shows attention areas
5. Results displayed with confidence score
   ↓
6. Doctor reviews findings
7. Opens RAG chat for medical literature
8. Asks follow-up medical questions
9. Gets evidence-based information
   ↓
10. Completes patient assessment
```

---

# 🌐 API Endpoints Configuration

## ⚠️ CRITICAL INFORMATION

**All API endpoints use ngrok tunnels** which are:
- ✅ Perfect for development and testing
- ❌ **NOT permanent** - change after each Colab restart
- ❌ **NOT suitable** for production without permanent hosting

---

## Current Endpoints (Last Updated: Dec 15, 2025)

### API Endpoint Summary

| Component | File | Endpoint | Port | Status |
|-----------|------|----------|------|--------|
| **Shifaa (Patient Q&A)** | PatientDashboard.tsx | Line ~8 | 5000 | 🔄 Changes |
| **RAG (Doctor Knowledge)** | DoctorDashboard.tsx | Line ~54 | 5001 | 🔄 Changes |
| **CV (Image Analysis)** | DoctorDashboard.tsx | Line ~55 | 5002 | 🔄 Changes |
| **Gemini Vision** | geminiService.ts | SDK | - | ✅ Static |

### 1. Shifaa API (Patient Medical Q&A)

```
URL: https://5ab638cff76e.ngrok-free.app/ask
File: pages/PatientDashboard.tsx (Line ~8)
Method: POST
Purpose: Answer patient health questions
```

**Request Example:**
```json
{
  "question": "ما هي أعراض السكري؟",
  "max_length": 512,
  "temperature": 0.2
}
```

**Response Example:**
```json
{
  "answer": "مرض السكري هو حالة طبية تؤثر على مستويات السكر في الدم..."
}
```

**Parameters:**
- `question` (String): User's health question in Arabic
- `max_length` (Number): Maximum response length in tokens (512)
- `temperature` (Number): Response consistency (0.2 = very consistent)

---

### 2. RAG API (Doctor Medical Knowledge Base)

```
URL: https://3fe64782a576.ngrok-free.app/ask
File: pages/DoctorDashboard.tsx (Line ~54)
Method: POST
Purpose: Retrieve medical knowledge for doctors
Health Check: /health
```

**Request Example:**
```json
{
  "query": "What are the latest treatment options for pneumonia?",
  "context": "Previous conversation context..."
}
```

**Response Example:**
```json
{
  "response": "## Treatment Options\n**Antibiotics** are the primary treatment...\n- Amoxicillin\n- Azithromycin\n- etc."
}
```

**Features:**
- Markdown-formatted responses
- Context-aware answers
- Medical evidence-based information

---

### 3. CV API (Medical Image Analysis)

```
URL: https://waspier-rowen-semialcoholic.ngrok-free.dev/predict
File: pages/DoctorDashboard.tsx (Line ~55)
Method: POST
Purpose: Analyze medical images and provide Grad-CAM
Health Check: /health
```

**Request Example:**
```json
{
  "image": "base64_encoded_image_data_here..."
}
```

**Response Example:**
```json
{
  "predictions": "Pneumonia detected with 94% confidence. Right lower lobe involvement...",
  "gradcam": "base64_encoded_heatmap_image...",
  "confidence": 0.94,
  "findings": {
    "abnormality": "pneumonia",
    "location": "right lower lobe",
    "severity": "moderate"
  }
}
```

**Returns:**
- `predictions`: Text analysis of the image
- `gradcam`: Base64 heatmap showing AI focus areas
- `confidence`: Confidence score (0-1)
- `findings`: Structured findings object

---


## 🔄 Step-by-Step: Updating Endpoints After Colab Restart

### Step 1: Start Your Colab Notebook

Open `model_upload.ipynb` and run all cells. You'll see output like:

```
Forwarding    http://abc123xyz789.ngrok-free.app -> localhost:5000
Forwarding    http://def456uvw012.ngrok-free.app -> localhost:5001
Forwarding    http://ghi789rst345.ngrok-free.app -> localhost:5002
```

### Step 2: Copy the Three New URLs

Note down:
- **Shifaa**: `https://abc123xyz789.ngrok-free.app`
- **RAG**: `https://def456uvw012.ngrok-free.app`
- **CV**: `https://ghi789rst345.ngrok-free.app`

### Step 3: Update PatientDashboard.tsx

**Original (Line 8):**
```tsx
const SHIFAA_API_URL = "https://5ab638cff76e.ngrok-free.app/ask";
```

**New:**
```tsx
const SHIFAA_API_URL = "https://abc123xyz789.ngrok-free.app/ask";
```

### Step 4: Update DoctorDashboard.tsx

**Original (Lines 54-55):**
```tsx
const RAG_API_URL = "https://3fe64782a576.ngrok-free.app/ask";
const CV_API_URL = "https://waspier-rowen-semialcoholic.ngrok-free.dev/predict";
```

**New:**
```tsx
const RAG_API_URL = "https://def456uvw012.ngrok-free.app/ask";
const CV_API_URL = "https://ghi789rst345.ngrok-free.app/predict";
```

### Step 5: Clear Cache & Restart Dev Server

```bash
# In VS Code Terminal
Ctrl+Shift+Delete  # Clear browser cache
npm run dev        # Restart development server
```

---

## 🛠️ Colab Setup Instructions

Complete Colab code to start all APIs:

```python
# 1. Install pyngrok
!pip install pyngrok flask flask-cors requests

# 2. Set ngrok authentication
from pyngrok import ngrok
ngrok.set_auth_token('YOUR_NGROK_AUTH_TOKEN_HERE')

# 3. Start ngrok tunnels
print("Starting API Servers...")

# Shifaa API on port 5000
public_url_shifaa = ngrok.connect(5000)
print(f"✓ Shifaa API: {public_url_shifaa}/ask")

# RAG API on port 5001
public_url_rag = ngrok.connect(5001)
print(f"✓ RAG API: {public_url_rag}/ask")

# CV API on port 5002
public_url_cv = ngrok.connect(5002)
print(f"✓ CV API: {public_url_cv}/predict")

# 4. Start your Flask/FastAPI servers
# (Your server startup code here)

print("\n✓ All servers online!")
print("Update your endpoints in the React app")
```

---

## 🔍 Testing Endpoints

### Quick Health Check (Run in Colab):

```python
import requests

print("Testing APIs...\n")

# Test RAG API
try:
    response = requests.get("https://YOUR_RAG_URL/health", timeout=5)
    print(f"✓ RAG API: {response.status_code} - Online")
except:
    print("✗ RAG API: Offline")

# Test CV API
try:
    response = requests.get("https://YOUR_CV_URL/health", timeout=5)
    print(f"✓ CV API: {response.status_code} - Online")
except:
    print("✗ CV API: Offline")

# Test Shifaa API
try:
    response = requests.post(
        "https://YOUR_SHIFAA_URL/ask",
        json={"question": "hello", "max_length": 100, "temperature": 0.2},
        timeout=5
    )
    print(f"✓ Shifaa API: {response.status_code} - Online")
except:
    print("✗ Shifaa API: Offline")
```

---

## 📋 Pre-Launch Checklist

Before running the application:

```
API Setup:
  ☐ Colab notebook is running (all cells executed)
  ☐ ngrok tunnels are active and displaying URLs
  ☐ Copied all 3 new endpoint URLs
  
Code Updates:
  ☐ PatientDashboard.tsx: Updated SHIFAA_API_URL
  ☐ DoctorDashboard.tsx: Updated RAG_API_URL
  ☐ DoctorDashboard.tsx: Updated CV_API_URL
  ☐ All files saved
  
Browser:
  ☐ Cleared cache (Ctrl+Shift+Delete)
  ☐ Cleared local storage (DevTools)
  
Development:
  ☐ Development server restarted (npm run dev)
  ☐ Browser tab refreshed
  ☐ No CORS errors in console
```

---

## 🚨 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Connection refused" | Colab not running | Restart Colab notebook |
| "404 Not Found" | Wrong endpoint URL | Copy new URL from Colab output |
| "CORS error" in console | Server doesn't allow requests | Add CORS headers to Flask/FastAPI |
| "Old endpoint" error | Browser cached response | Clear cache (Ctrl+Shift+Delete) |
| "Timed out" | API taking too long | Check Colab for errors; restart |
| "Invalid response" | API format changed | Check API response format |

---

## 🔐 Important Security Notes

### Development (Current)
```
✅ Using ngrok for local testing
✅ Suitable for demo and development
✅ Free tier rate limit: 40 req/min
```

### Production (Future)
```
❌ Do NOT use ngrok URLs
✓ Use dedicated servers/cloud hosting
✓ Set up proper HTTPS
✓ Implement authentication
✓ Use environment-based configuration
✓ Never hardcode API URLs
```

---

## Better Practice: Environment Variables

Instead of hardcoding URLs, create a `.env` file:

```bash
# .env (in project root)
REACT_APP_SHIFAA_API=https://your_url.ngrok-free.app/ask
REACT_APP_RAG_API=https://your_url.ngrok-free.app/ask
REACT_APP_CV_API=https://your_url.ngrok-free.dev/predict
```

Then update your code:

```tsx
// PatientDashboard.tsx
const SHIFAA_API_URL = process.env.REACT_APP_SHIFAA_API || "https://backup.ngrok-free.app/ask";

// DoctorDashboard.tsx
const RAG_API_URL = process.env.REACT_APP_RAG_API || "https://backup.ngrok-free.app/ask";
const CV_API_URL = process.env.REACT_APP_CV_API || "https://backup.ngrok-free.dev/predict";
```

---

# 🔗 Navigation & Architecture

## Complete Navigation Flow

```
┌─────────────────────────────────────────────────────┐
│                   Application Root                   │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │      HomePage.tsx       │
        │  (Landing/Introduction) │
        └────────────┬────────────┘
                     │
        ┌────────────▼──────────────────┐
        │      LoginPage.tsx            │
        │  (Role Selection)             │
        └────────┬──────────────┬───────┘
                 │              │
       ┌─────────▼────┐   ┌─────▼──────────┐
       │ DoctorCard   │   │  PatientCard   │
       │  onClick()   │   │   onClick()    │
       └─────────┬────┘   └─────┬──────────┘
                 │              │
    ┌────────────▼──────┐   ┌───▼──────────────┐
    │ DoctorDashboard   │   │PatientDashboard  │
    │  .tsx             │   │ .tsx             │
    ├───────────────────┤   ├──────────────────┤
    │ ┌──────────────┐  │   │  │
    │ │Image Upload  │  │   │ │
    │ │& Analysis    │  │   │  │
    │ │(CV API)      │  │   │  
    │ ├──────────────┤  │   │ ├──────────────┤ │
    │ │Grad-CAM      │  │   │ │Chat Interface│ │
    │ │Visualization │  │   │ │Health Q&A    │ │
    │ │              │  │   │ │(Shifaa API)  │ │
    │ ├──────────────┤  │   │ └──────────────┘ │
    │ │Medical Q&A   │  │   │                  │
    │ │Chat          │  │   │                  │
    │ │(RAG API)     │  │   │                  │
    │ │              │  │   │                  │
    │ ├──────────────┤  │   │                  │
    │ │Health Status │  │   │                  │
    │ │Indicators    │  │   │                  │
    │ │(RAG + CV)    │  │   │                  │
    │ └──────────────┘  │   │                  │
    └───────────────────┘   └──────────────────┘
```

## Component Hierarchy

```
App.tsx
├── HomePage.tsx
│   ├── Hero Section
│   ├── Introduction Section
│   └── Features Section (Flip Cards)
│       ├── BrainCircuitIcon
│       ├── StethoscopeIcon
│       └── MessageSquareHeartIcon
│
├── LoginPage.tsx
│   ├── Doctor Card
│   │   └── Image (Unsplash)
│   └── Patient Card
│       └── Text Placeholder
│
├── PatientDashboard.tsx
│   ├── File Input Handler
│   ├── Chat Container
│   │   ├── Message Bubbles (User)
│   │   └── Message Bubbles (Model)
│   └── Input Controls
│       └── Send Button
│
└── DoctorDashboard.tsx
    ├── MarkdownRenderer Component
    ├── BrainCircuitIcon
    ├── Image Upload Section
    │   ├── File Input
    │   └── Analysis Results
    │       ├── Text Results
    │       └── Grad-CAM Image
    └── Chat Section
        ├── Medical Q&A
        ├── Message History
        ├── Health Status Indicators
        │   ├── RAG API Status
        │   └── CV API Status
        └── Input Controls
```

---

# 🚀 Setup & Deployment

## Prerequisites

```
✓ Node.js 16+ or 18+
✓ npm or yarn
✓ Python 3.8+ (for Colab)
✓ Google account (for Colab & Gemini API)
✓ ngrok account (free tier)
```

## Installation Steps

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd طبيبك---ai-medical-platform
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create `.env` file in project root:
```bash
# Google Gemini API Key
REACT_APP_GEMINI_API_KEY=your_api_key_here

# API Endpoints (update after Colab restart)
REACT_APP_SHIFAA_API=https://your_url.ngrok-free.app/ask
REACT_APP_RAG_API=https://your_url.ngrok-free.app/ask
REACT_APP_CV_API=https://your_url.ngrok-free.dev/predict
```

### 4. Setup Colab Notebook

- Open `model_upload.ipynb` in Google Colab
- Set your ngrok auth token
- Run all cells to start API servers
- Copy new endpoint URLs
- Update `.env` file

### 5. Start Development Server
```bash
npm run dev
# Runs on http://localhost:5173 (Vite)
```

## Build for Production

```bash
npm run build
# Creates optimized production build in 'dist' folder
```

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)
```bash
npm install -g vercel
vercel
# Follow prompts to deploy
```

### Option 2: GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

### Option 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

# 🔒 Security & Best Practices

## Security Considerations

### 1. Medical Data Privacy
```
⚠️ HIPAA Compliance Required:
   - Patient data is sensitive
   - Ensure HTTPS for all connections
   - Implement proper authentication
   - Consider encryption at rest
   
Current Status:
   ❌ Not HIPAA compliant (development only)
   ✅ Use for testing/demo only
   ✓ Plan HIPAA implementation for production
```

### 2. API Key Management
```
✓ DO:
   - Store API keys in environment variables
   - Use .env files (NOT in git)
   - Add .env to .gitignore
   - Rotate keys regularly
   - Use secrets management in production
   
✗ DON'T:
   - Hardcode API keys in source
   - Commit .env to GitHub
   - Share keys in messages/emails
   - Use same keys for dev & prod
```

### 3. Input Validation
```
Always validate:
   ✓ File types (check MIME type)
   ✓ File size (limit to reasonable size)
   ✓ User inputs (sanitize before API call)
   ✓ API responses (validate before use)
```

### 4. CORS Configuration
```
Current (Development):
   Allow: localhost:5173

Production:
   Allow: Your domain only
   Methods: POST, GET
   Headers: Content-Type
```

## Best Practices

### Code Organization
```
✓ Follow naming conventions
✓ Use TypeScript for type safety
✓ Keep components small and focused
✓ Separate concerns (UI, API, logic)
✓ Use proper error boundaries
```

### Error Handling
```tsx
// Good:
try {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  setResult(data);
} catch (error) {
  console.error('API call failed:', error);
  setError('Failed to process request. Please try again.');
}

// Bad:
const data = await fetch(API_URL).then(r => r.json());
```

### Performance
```
✓ Implement request debouncing
✓ Use memoization for expensive calculations
✓ Optimize images before upload
✓ Implement pagination for lists
✓ Cache API responses appropriately
```

---

# 📞 Troubleshooting

## Common Issues & Solutions

### 1. "API Connection Refused"
```
Symptoms:
  - "ERR_CONNECTION_REFUSED"
  - "Network error"
  - "Failed to fetch"

Solutions:
  ① Check Colab is running: Open notebook and look for cell outputs
  ② Verify ngrok URLs are current: Copy new URLs from Colab
  ③ Check endpoint URLs in code: Ensure they match Colab output
  ④ Restart dev server: Ctrl+C, then `npm run dev`
  ⑤ Clear browser cache: Ctrl+Shift+Delete
```

### 2. "CORS Error" (Access Denied)
```
Error Message:
  "Access to XMLHttpRequest blocked by CORS policy"

Causes:
  - API server doesn't allow your domain
  - Missing CORS headers on API
  
Solutions:
  ① Add CORS headers to Flask/FastAPI:
     from flask_cors import CORS
     CORS(app, origins=["http://localhost:5173"])
     
  ② Check Colab CORS configuration
  ③ Verify request headers are correct
```

### 3. "404 Not Found"
```
Symptoms:
  - "404 error from API"
  - "Endpoint not found"

Causes:
  - Wrong endpoint URL
  - API server crashed
  - Wrong HTTP method
  
Solutions:
  ① Copy correct URL from Colab
  ② Check Colab for server errors
  ③ Verify endpoint path (/ask vs /predict)
  ④ Test endpoint with curl/Postman
```

### 4. "Image Analysis Not Working"
```
Symptoms:
  - No response after upload
  - Error message about image

Solutions for Gemini API:
  ① Check API key in .env
  ② Verify image is valid format (PNG, JPG)
  ③ Check image size (< 20MB)
  ④ Check API quota not exceeded
  ⑤ Review browser console for errors
```

### 5. "Chat Not Responding"
```
Symptoms:
  - Send button not working
  - No response from AI
  - Infinite loading

Solutions:
  ① Verify Shifaa API is online: Test /health endpoint
  ② Check Colab for server errors
  ③ Wait for Colab response (can be slow)
  ④ Refresh page and try again
  ⑤ Check browser console for error messages
```

### 6. "Grad-CAM Not Displaying"
```
Symptoms:
  - Image analysis works but no heatmap
  - Grad-CAM image is blank

Solutions:
  ① Verify CV API is returning gradcam data
  ② Check image format (should be base64)
  ③ Check browser console for errors
  ④ Verify API response structure
```

## Debug Checklist

```
Quick Diagnostic Steps:

1. Check Colab:
   ☐ Notebook running (green checkmark)
   ☐ All cells executed
   ☐ No error messages
   ☐ ngrok URLs printed

2. Browser:
   ☐ Open DevTools (F12)
   ☐ Check Network tab
   ☐ Look for failed requests
   ☐ Check Console for errors

3. Code:
   ☐ Endpoint URLs updated
   ☐ .env file configured
   ☐ API keys present
   ☐ Code has no syntax errors

4. System:
   ☐ Dev server running (npm run dev)
   ☐ Port 5173 is available
   ☐ Internet connection stable
   ☐ VPN disabled (if applicable)
```

## Browser Console Error Codes

```
CORS errors:
  Solution: Add CORS headers to API

Connection refused:
  Solution: Start Colab servers

404 errors:
  Solution: Update endpoint URL

401/403 errors:
  Solution: Check API keys and permissions

500 errors:
  Solution: Check Colab server logs
```

---

# 📚 Additional Resources

## External Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev)
- [ngrok Documentation](https://ngrok.com/docs)

## File Structure
```
.
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── PatientDashboard.tsx
│   └── DoctorDashboard.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── IconComponents.tsx
├── services/
│   ├── geminiService.ts
│   └── medicalRagService.ts
├── types.ts
├── App.tsx
├── index.tsx
└── vite.config.ts
```

---


## Quick Start Summary

1. **Setup**: `npm install` → Configure `.env` → Start Colab
2. **Update APIs**: Copy ngrok URLs → Update endpoints in code
3. **Run**: `npm run dev` → Open `http://localhost:5173`
4. **Test**: Visit HomePage → Try both Doctor & Patient flows
5. **Deploy**: `npm run build` → Deploy to Vercel or similar

**Happy coding! 🏥🤖**



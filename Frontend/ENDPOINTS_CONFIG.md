# 🌐 API Endpoints Configuration Guide

## ⚠️ CRITICAL: Endpoints Change After Each Colab Restart

All API endpoints in this project use **ngrok tunnels** which are temporary URLs that **change every time** the Colab notebook restarts or the session ends.

---

## 📍 Current Endpoints (As of Last Update)

### 1. **Shifaa API** (Patient Medical Q&A)
**File**: `pages/PatientDashboard.tsx` (Line ~8)
```
https://5ab638cff76e.ngrok-free.app/ask
```
- **Purpose**: Medical question answering for patients
- **Method**: POST
- **Parameters**: 
  - `question`: User's health question (String)
  - `max_length`: 512
  - `temperature`: 0.2

---

### 2. **RAG API** (Doctor Medical Knowledge Base)
**File**: `pages/DoctorDashboard.tsx` (Line ~54)
```
https://3fe64782a576.ngrok-free.app/ask
```
- **Purpose**: Retrieval-Augmented Generation for medical professionals
- **Method**: POST
- **Health Check**: `/health` endpoint available
- **Parameters**: Context-aware medical queries

---

### 3. **CV API** (Medical Image Analysis + Grad-CAM)
**File**: `pages/DoctorDashboard.tsx` (Line ~55)
```
https://waspier-rowen-semialcoholic.ngrok-free.dev/predict
```
- **Purpose**: Computer vision analysis and Grad-CAM visualization
- **Method**: POST
- **Health Check**: `/health` endpoint available
- **Parameters**: Medical image (base64 encoded)
- **Returns**: Analysis results + Grad-CAM heatmap

---

### 4. **Gemini Vision API**
**File**: `pages/PatientDashboard.tsx` (via `services/geminiService.ts`)
```
Part of Google Gemini SDK (API key based)
```
- **Purpose**: Medical image analysis for patients
- **Method**: Direct SDK integration
- **Authorization**: API key configured in environment

---

## 🔄 How to Update Endpoints After Colab Restart

### Step 1: Run Your Colab Notebook
Execute your `model_upload.ipynb` to start the ngrok tunnels and see the new endpoints in the output.

### Step 2: Copy New Endpoints
When ngrok starts, you'll see output like:
```
Forwarding    http://abc123def456.ngrok-free.app -> localhost:5000
```

### Step 3: Update Files

#### For PatientDashboard.tsx:
```tsx
// OLD - Line 8
const SHIFAA_API_URL = "https://5ab638cff76e.ngrok-free.app/ask";

// NEW - Replace with your new endpoint
const SHIFAA_API_URL = "https://YOUR_NEW_NGROK_URL.ngrok-free.app/ask";
```

#### For DoctorDashboard.tsx:
```tsx
// OLD - Lines 54-55
const RAG_API_URL = "https://3fe64782a576.ngrok-free.app/ask";
const CV_API_URL = "https://waspier-rowen-semialcoholic.ngrok-free.dev/predict";

// NEW - Replace with your new endpoints
const RAG_API_URL = "https://YOUR_NEW_RAG_URL.ngrok-free.app/ask";
const CV_API_URL = "https://YOUR_NEW_CV_URL.ngrok-free.dev/predict";
```

---

## 🛠️ Colab Setup Instructions

### Run Your API Servers in Colab:

```python
# 1. Install ngrok
!pip install pyngrok

# 2. Set ngrok authtoken (get from ngrok.com)
from pyngrok import ngrok
ngrok.set_auth_token('YOUR_NGROK_AUTH_TOKEN')

# 3. Start your APIs with ngrok forwarding
# For Shifaa API (Port 5000)
public_url_shifaa = ngrok.connect(5000)
print(f"Shifaa API: {public_url_shifaa}")

# For RAG API (Port 5001)
public_url_rag = ngrok.connect(5001)
print(f"RAG API: {public_url_rag}")

# For CV API (Port 5002)
public_url_cv = ngrok.connect(5002)
print(f"CV API: {public_url_cv}")
```

---

## 📋 Endpoint Configuration Checklist

### Before Running Application:
- [ ] Verify Colab notebook is running (all 3 servers active)
- [ ] Copy new ngrok URLs from Colab output
- [ ] Update all 3 endpoints in your code files
- [ ] Check that all APIs are responding (test `/health` endpoints)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Restart the development server

### Common Issues:
| Issue | Solution |
|-------|----------|
| "Connection refused" | Colab server is not running - restart notebook |
| "404 Not Found" | Endpoint URL is wrong or server crashed |
| "CORS error" | Server needs to allow requests from your origin |
| "Old endpoint still used" | Browser cache - clear cache and reload |

---

## 🔍 Testing Endpoints

### Quick Test Commands (in Colab):

```python
import requests

# Test Shifaa API
response = requests.post(
    "https://YOUR_SHIFAA_URL/ask",
    json={"question": "What is diabetes?", "max_length": 512, "temperature": 0.2}
)
print(response.json())

# Test RAG API Health
response = requests.get("https://YOUR_RAG_URL/health")
print(f"Status: {response.status_code}")

# Test CV API Health
response = requests.get("https://YOUR_CV_URL/health")
print(f"Status: {response.status_code}")
```

---

## 📝 Endpoint Details by Function

### **Shifaa API** (`/ask`)
**Request:**
```json
{
  "question": "ما هي أعراض السكري؟",
  "max_length": 512,
  "temperature": 0.2
}
```

**Response:**
```json
{
  "answer": "مرض السكري هو حالة طبية تؤثر على مستويات السكر في الدم..."
}
```

---

### **RAG API** (`/ask`)
**Request:**
```json
{
  "query": "Medical question with context from chat history",
  "context": "Previous messages..."
}
```

**Response:**
```json
{
  "response": "Markdown formatted medical information with **bold**, *italic*, and lists..."
}
```

---

### **CV API** (`/predict`)
**Request:**
```json
{
  "image": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "predictions": "Analysis results",
  "gradcam": "base64_encoded_heatmap",
  "confidence": 0.95
}
```

---

## 🚨 Important Details to Remember

### 1. **ngrok URLs are Temporary**
   - Valid for as long as Colab session is running
   - Invalid after Colab restarts or 8-hour idle timeout
   - Always copy new URLs after Colab restarts

### 2. **Port Mapping**
   - Shifaa API typically runs on `localhost:5000`
   - RAG API typically runs on `localhost:5001`
   - CV API typically runs on `localhost:5002`
   - Adjust ngrok forwarding accordingly

### 3. **CORS Settings**
   - Ensure Colab backend allows requests from `localhost:3000` (Vite dev server)
   - Add proper CORS headers in Flask/FastAPI apps



### 5. **API Response Times**
   - Shifaa API: ~2-5 seconds per response
   - RAG API: ~3-8 seconds (depends on context)
   - CV API: ~4-10 seconds (image processing)

### 6. **Rate Limiting**
   - ngrok free tier: 40 requests per minute
   - Consider implementing request queuing if needed

---

## 📞 Debugging Steps

If APIs aren't working:

1. **Check Colab is Running**
   ```python
   # Run this in Colab
   print("Server is running")
   ```

2. **Verify ngrok Tunnel**
   ```python
   from pyngrok import ngrok
   tunnels = ngrok.get_tunnels()
   for tunnel in tunnels:
       print(tunnel)
   ```

3. **Test Direct API Call**
   ```python
   import requests
   response = requests.get("https://YOUR_URL/health")
   print(response.status_code, response.text)
   ```

4. **Check Browser Console**
   - Open DevTools (F12)
   - Check Network tab for failed requests
   - Look for CORS errors in Console

5. **Clear Cache**
   - Ctrl+Shift+Delete
   - Clear all cached data
   - Reload page

---

## ✅ Quick Reference Table

| Component | File | Endpoint | Port |
|-----------|------|----------|------|
| Shifaa (Patient Chat) | `PatientDashboard.tsx` | `/ask` | 5000 |
| RAG (Doctor Knowledge) | `DoctorDashboard.tsx` | `/ask` | 5001 |
| CV (Image Analysis) | `DoctorDashboard.tsx` | `/predict` | 5002 |

---



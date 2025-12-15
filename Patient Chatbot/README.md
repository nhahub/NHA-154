# 🏥 Tabibak: Patient Chatbot

---

## 🎯 Overview
**Why Tabibak Exists**
Imagine feeling a sudden chest pain at 2:00 AM. You're anxious, but it's too late to call a doctor. You turn to Google ("Dr. Google"), only to find conflicting information that increases your panic.
This is the "Uncertainty Gap" that Tabibak addresses.

The **Tabibak Patient AI** is an AI-powered conversational system designed to:
- Answer patient health questions in Arabic
- Provide medical information in simple, understandable language
- Support multi-turn conversations with context awareness
- Assist patients before they consult with doctors
- Reduce patient anxiety through educational information

### 🔑 Key Capabilities

*   ✅ **Arabic Medical Q&A** – Specialized in Arabic medical consultations.
*   ✅ **Context Aware** – Remembers full conversation history.
*   ✅ **Privacy-First** – Fine-tuned on anonymized data (no PII).
*   ✅ **High Accuracy** – Achieved **70.50% BERTScore** with Llama 3.1.
*   ✅ **Fast Responses** – Optimized inference (**<2 seconds**).
*   ✅ **Safe & Reliable** – Includes medical disclaimers and professional referral guidance.  
---
## 💡 Solution & Innovation

### 🌐 Unified Digital Platform
We leverage **Artificial Intelligence** to provide:
*   **Instant medical guidance** for patients.
*   **Advanced research tools** for doctors.
*   A cohesive platform combining **Computer Vision (images)** and **Natural Language Processing (text)**.

### 🎯 Strategic Objectives
1.  **Human-like Interaction:** Developing a system capable of human-like medical guidance, moving beyond static informational tools.
2.  **Integrated Platform:** Seamless combination of CV and NLP into a single user experience.
3.  **Validated Performance:** Ensuring reliability through technical accuracy metrics and real-world usability feedback.

### 🚀 Key Innovations

#### 🐜 Ant Colony Optimization (ACO)
A bio-inspired algorithm for automatic hyperparameter tuning:
*   **Traditional approach:** Manual parameter tuning takes **3-5 days**.
*   **Our approach:** ACO finds optimal settings in just **4 hours**.
*   **Capability:** Optimizes `temperature`, `top-p`, and `max_tokens` simultaneously.
*   **Efficiency:** Requires only **20 evaluations** vs hundreds needed by traditional methods.

#### 🧠 Custom Medical Adapter
A lightweight neural network layer designed for medical specialization:
*   **Architecture:** `3584 → 512 → 3584` (Bottleneck design).
*   **Efficiency:** **95% fewer parameters** to train compared to full retraining.
*   **Speed:** **10x faster training** while preserving the base model's general knowledge.
*   **Impact:** Adds deep, domain-specific medical understanding to the model.
---
## ✨ Features

### Core Capabilities

#### 1. 🏥 Medical Question Answering in Arabic
*   **Input:** Patient's health question in Arabic.
*   **Processing:** Fine-tuned Llama 3.1 model inference.
*   **Output:** Medically accurate, culturally appropriate response.

**Examples:**
```text
Q: "ما هي أعراض السكري؟"
A: "مرض السكري هو حالة تتميز برفع مستويات الجلوكوز في الدم..."

Q: "كيف أتعامل مع الحمى؟"
A: "الحمى هي رد فعل طبيعي للجسم..."
```

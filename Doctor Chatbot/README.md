# 🏥 Tabibak: Doctor Chatbot

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-RAG-00D9FF?style=for-the-badge)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-FF6B6B?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Google-Gemini_API-4285F4?style=for-the-badge)
</div>

**An intelligent medical research assistant powered by Retrieval-Augmented Generation (RAG)**
---
## 🏥 The Problem: Information Overload in Healthcare

Picture this: **It's 2 AM in the emergency room**. Dr. Sarah is treating a patient with unusual symptoms—a combination of cardiac arrhythmia and acute kidney dysfunction. She remembers reading about a similar case in a recent study about drug interactions, but which medication was it? Which journal? What were the exact recommendations?

She needs answers **fast**, but searching through thousands of medical papers manually would take hours she doesn't have.

This is the daily reality for healthcare professionals worldwide:

- 📚 **Over 1.5 million new research papers** published annually on PubMed alone
- ⏰ **Limited time** to stay current with medical literature
- 🔍 **Difficulty finding specific information** when making critical decisions
- ❓ **Uncertainty about evidence quality** and source reliability
- 📱 **Fragmented tools** that don't integrate seamlessly into clinical workflow
### 💡 Our Solution: A Medical Research Companion

We built an **AI-powered research assistant** that acts like having a medical librarian with photographic memory at your fingertips. It doesn't just search—it **understands, synthesizes, and explains** medical literature in seconds.

Think of it as **Google Scholar meets ChatGPT**, but specifically designed for medical professionals with:
- ✅ Evidence-based responses backed by peer-reviewed sources
- ✅ Confidence scores for transparency
- ✅ Citation tracking for verification
- ✅ Safety-first design that never hallucinates
### 🌍 Real-World Impact

This system is part of **Tabibak**, a comprehensive AI healthcare platform that bridges the gap between patients and doctors. The Doctor Chatbot specifically empowers medical professionals to:

- **Make faster, evidence-based decisions** during patient consultations
- **Stay updated with latest research** without spending hours reading
- **Verify treatment protocols** against current medical literature
- **Discover relevant studies** they might have missed
- **Cross-reference multiple sources** instantly for complex cases

---
## ✨ Core Features

### 🧠 Hybrid Intelligence Retrieval

Our system doesn't rely on just one search method—it combines the best of both worlds:

#### **Semantic Search (Dense Vectors)**
Uses medical-specific embeddings to understand the *meaning* behind queries:
- "What helps with high blood pressure?" → Finds papers about "hypertension management"
- Understands medical synonyms and related concepts
- Powered by **MedEmbed-large-v0.1** model trained on medical literature

#### **Keyword Search (BM25 Sparse)**
Traditional but powerful keyword matching:
- Finds exact medical terminology and drug names
- Excellent for specific queries like "metformin dosage"
- Fast and computationally efficient

#### **Hybrid Fusion**
Intelligently combines both methods with a tunable **alpha (α) parameter**:
- α = 0.3 → More weight on keyword matching
- α = 0.5 → Balanced approach (default)
- α = 0.7 → More weight on semantic understanding

**Result**: Best of both worlds—catches both specific medical terms and conceptually related information.

```
┌─────────────────────────────────────────────────────┐
│      USER: "Latest treatments for heart failure"     │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   Semantic Search      Keyword Search
   Understanding          Finding
   "cardiac failure"      "heart failure"
   "HF management"        "ventricular"
   "cardiovascular"       "ejection fraction"
        │                     │
        └──────────┬──────────┘
                   │
           Hybrid Fusion
           (α = 0.5)
                   │
           ┌───────▼────────┐
           │  Ranked Results │
           │  Top 5 Papers   │
           └─────────────────┘
```

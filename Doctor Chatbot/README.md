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
           │  Ranked Results│
           │  Top 5 Papers  │
           └────────────────┘
```
### 🎯 Two-Stage RAG Pipeline

Unlike simple Q&A systems, our RAG pipeline thinks in **two stages**, mimicking how expert researchers approach literature review:

#### **Stage 1: Document Analysis & Evidence Extraction**
The system acts as a careful researcher:
1. **Reads** all retrieved medical documents thoroughly
2. **Extracts** relevant evidence related to the query
3. **Identifies** key findings, methodologies, and conclusions
4. **Notes** any contradictions or disagreements between sources
5. **Flags** limitations, gaps, or uncertainties in the evidence

#### **Stage 2: Synthesis & Structured Response**
Then it synthesizes findings into a clinical-grade answer:
1. **Constructs** an evidence-based response
2. **Cites** specific sources (PMID numbers) for every claim
3. **Provides** a confidence score (0-100%)
4. **Lists** caveats, limitations, and warnings
5. **Suggests** when to consult specialists or seek additional information

**Example Output Structure:**
```
ANSWER:
Current evidence suggests ACE inhibitors reduce mortality 
in heart failure patients by 20-25% (PMID-12345678). Beta-blockers 
show similar efficacy when combined with ACE inhibitors (PMID-87654321).

SOURCES USED:
• PMID-12345678: Meta-analysis of 15 RCTs (2023)
• PMID-87654321: Large cohort study (2024)

CONFIDENCE: 85%
Based on multiple high-quality studies with consistent findings.

LIMITATIONS:
• Studies primarily focused on patients with reduced ejection fraction
• Long-term outcomes beyond 5 years limited
• Dosage variations across studies

RECOMMENDATIONS:
Consult cardiologist for patient-specific dosing and monitoring protocols.
```

### 🔒 Safety-First Design

Medical information is critical—we can't afford hallucinations or misinformation:

- **No Speculation**: If the system doesn't find information in retrieved documents, it explicitly says "Not found in provided sources"
- **Always Cited**: Every single claim must be backed by a PMID citation
- **Confidence Transparent**: Clear percentage showing how certain the answer is
- **Limitation Warnings**: Explicitly states gaps, contradictions, or uncertainties
- **Professional Boundaries**: Reminds users to consult healthcare providers for final decisions

---
## 🏗️ System Architecture

### The Complete Journey: From PubMed to Answers

```
┌─────────────────────────────────────────────────────────┐
│               📚 DATA COLLECTION PHASE                  │
│                                                          │
│  PubMed Database                                         │
│  └─> Entrez API                                          │
│      └─> Fetch  Medical Documents                        │
│          • Research papers                               │
│          • Clinical trials                               │
│          • Meta-analyses                                 │
│          • Case studies                                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              🧹 PREPROCESSING PHASE                     │
│                                                         │
│  Clean & Normalize:                                     │
│  ✓ Remove author info, DOIs, references                 │
│  ✓ Filter English-language only                         │
│  ✓ Clean formatting, special characters                 │
│  ✓ Remove copyright notices & metadata noise            │
│  ✓ Preserve medical terminology & abbreviations         │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                ✂️ CHUNKING PHASE                        │
│                                                         │
│  RecursiveCharacterTextSplitter                         │
│  • chunk_size: 1000 characters (~250 words)             │
│  • chunk_overlap: 200 characters                        │
│  • Separators: paragraphs → sentences → words           │
│                                                         │
│  Result: Semantically coherent text chunks              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│            💾 VECTOR DATABASE PHASE                    │
│                                                        │ 
│  ┌─────────────────────┐    ┌──────────────────────┐   │
│  │   ChromaDB          │    │    BM25 Index        │   │
│  │  (Dense Vectors)    │    │  (Sparse Tokens)     │   │
│  │                     │    │                      │   │
│  │  🧠 MedEmbed Model  │    │  🔤 Keyword Search  │   │
│  │  3584-dim vectors   │    │  Token frequency     │   │
│  │  Cosine similarity  │    │  TF-IDF weighting    │   │
│  └─────────────────────┘    └──────────────────────┘   │
└────────────────────┬───────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│              👨‍⚕️ DOCTOR'S QUERY                           │
│  "What are the contraindications for ACE inhibitors?"    │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          🔍 RETRIEVAL PHASE (Hybrid)                   │
│                                                         │
│  Parallel Processing:                                   │
│  • Dense Search: Semantic similarity matching           │
│  • Sparse Search: Keyword matching (BM25)               │
│  • Score Fusion: α × dense + (1-α) × sparse             │ 
│  • Ranking: Sort by fused relevance score               │
│                                                         │
│  Parameters:                                            │
│  • k=5 (retrieve top 5 documents)                       │
│  • α=0.5 (balanced hybrid weight)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│              📄 TOP-K DOCUMENTS                          │
│  Ranked list of most relevant medical papers             │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          📝 PROMPT CONSTRUCTION                         │
│                                                         │
│  Two-Stage Structured Prompt:                           │
│                                                         │
│  Stage 1: Analysis Instructions                         │
│  • Read all documents carefully                         │
│  • Extract relevant evidence                            │
│  • Note contradictions & limitations                    │
│                                                         │
│  Stage 2: Synthesis Instructions                        │
│  • Create structured answer                             │
│  • Cite all sources (PMID)                              │
│  • Provide confidence score                             │
│  • List caveats & recommendations                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          🤖 GENERATION PHASE                           │
│                                                         │
│  Google Gemini API                                      │
│  Model: gemini-2.5-flash-lite-preview-06-17             │
│                                                         │
│  Safety Features:                                       │
│  • No hallucination allowed                             │
│  • Must cite sources for every claim                    │
│  • Must acknowledge uncertainty                         │
│  • Must flag missing information                        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│          ✅ STRUCTURED RESPONSE                          │
│                                                           │
│  📋 Answer: Evidence-based medical response              │
│  📚 Sources: PMID citations                              │
│  🎯 Confidence: Percentage + reasoning                   │
│  ⚠️ Caveats: Limitations & warnings                      │
│  💡 Recommendations: Next steps                          │
└──────────────────────────────────────────────────────────┘
```

---

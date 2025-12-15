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

#### 2. **Multi-turn Conversations**
- Maintains context across entire conversation
- Provides relevant follow-up responses
- Remembers patient's medical history within session
- Prevents repetitive information

#### 3. **Safety Features**
```
✓ Medical disclaimers on all responses
✓ Encourages professional consultation
✓ Avoids definitive diagnosis claims
✓ Provides factual medical information only
✓ Flags urgent situations for immediate doctor visit
✓ Privacy-preserving (no data retention)
```

---

## 📊 Dataset & Preprocessing

### Shifaa Dataset

**Source**: Real Arabic medical consultations  
**Size**: 84,422 question-answer pairs  
**Format**: 16 CSV files organized by medical specialty  
**Language**: Modern Standard Arabic + dialects  
**Timespan**: 2003-2024

#### Original Structure
- **Question Title**
- **Question** (Patient inquiry)
- **Answer** (Doctor response)
- **Doctor Name**
- **Consultation Number**
- **Date of Answer**
- **Hierarchical Diagnosis**

### Preprocessing Pipeline

#### Step 1: Data Consolidation
```
Input: 16 separate CSV files (by specialty)
Process:
  ├─ Load all 16 files
  ├─ Extract Question and Answer columns
  └─ Combine into unified dataframe
Output: 84,422 question-answer pairs
```

#### Step 2: Text Cleaning
```
Removed:
  ✗ Islamic greetings and salutations (السلام عليكم ورحمة الله وبركاته)
  ✗ Doctor names and professional titles
  ✗ Site acknowledgments and thank you messages
  ✗ Newlines, extra whitespace, special characters

Preserved:
  ✓ Meaningful Arabic text
  ✓ Essential punctuation
  ✓ Medical terminology
```

**Rationale**: Keep the chatbot neutral and focused on medical information without religious or cultural biases.

#### Step 3: Data Finalization
```
Process:
  ├─ Shuffle dataset randomly (balanced distribution)
  ├─ Reset index (clean sequential numbering)
  └─ Export to CSV (UTF-8-sig encoding)

Result:
  ├─ 84,422 total records
  ├─ 16 medical categories
  └─ 2 columns (Question, Answer)
```

### Privacy-First Approach
```
Challenges:
  ✗ 84k consultations contained PII
  ✗ Religious phrases could bias model
  ✗ Dialects varied across regions

Solutions:
  ✓ Automated PII removal (names, IDs, locations)
  ✓ Neutral medical language preservation
  ✓ Dialect normalization while keeping essence
  ✓ Quality filtering (removed low-quality entries)
  ✓ GDPR-compliant data handling
```

---

## 🤖 Model Training

### Model Selection & Comparison

We experimented with multiple state-of-the-art models:

| Model | Parameters | Epochs | Dataset | BERTScore | Winner? |
|-------|-----------|--------|---------|-----------|---------|
| **Meta-Llama-3.1-8B-Instruct** | 8B | 1 | 100% (84,422) | **70.50%** | 🏆 YES |
| **Unsloth/Meta-Llama-3.1-8B** | 8B | 1 | 100% (84,422) | 65.16% | ❌ |
| **Llama (Not Fine-tuned)** | 8B | - | - | 61.29% | ❌ |
| **Qwen/Qwen2.5-7B** | 7B | 4 | 10% (8,442) | 69.85% | ❌ |
| **Qwen/Qwen2.5-7B** | 7B | 3 | 10% (8,442) | 69.80% | ❌ |
| **Qwen (Not Fine-tuned)** | 7B | - | - | 65.02% | ❌ |

**Winner: Meta-Llama-3.1-8B-Instruct** 🏆
### Why Llama 3.1 Won
- **Superior Arabic language understanding**
- **Better handling of medical terminology**
- **Highest semantic accuracy (70.50% BERTScore)**
- **More coherent long-form responses**
- **Excellent context retention**

### Training Configuration

#### Llama 3.1 Training
```python
Base Model: Meta-Llama-3.1-8B-Instruct
Dataset: 84,422 samples (100%)

Fine-tuning Method: QLoRA (Quantized LoRA)
Framework: Unsloth (memory optimization)

Hyperparameters:
  - Epochs: 1
  - Max Sequence Length: 1024
  - Batch Size: 8
  - Learning Rate: 2e-4
  - LoRA Rank (R): 64
  - LoRA Alpha: 128
  - Quantization: 4-bit

```
#### Qwen Training (with Medical Adapter)
```python
Base Model: Qwen/Qwen2.5-7B-Instruct
Dataset: 8,442 samples (10%)

Architecture: QLoRA + Custom Medical Adapter

Hyperparameters:
  - Epochs: 3-4
  - Max Sequence Length: 1024
  - Batch Size: 8
  - Learning Rate: 2e-4
  - LoRA Rank (R): 64
```

### Training Process

```
Step 1: Environment Setup
  └─ Install PyTorch, Transformers, Unsloth, PEFT
  └─ Configure GPU and CUDA

Step 2: Data Preparation
  └─ Load Shifaa dataset (84,422 samples)
  └─ Format as conversational pairs
  └─ Tokenize with model tokenizer
  └─ Create training/validation split (90/10)

Step 3: Model Initialization
  └─ Load base Llama 3.1 model
  └─ Apply 4-bit quantization
  └─ Configure LoRA adapters (R=64)
  └─ Initialize optimizer (AdamW)

Step 4: Training Loop
  └─ Train for 1 epoch
  └─ Gradient accumulation steps: 4
  └─ Mixed precision training (FP16)
  └─ Gradient checkpointing enabled
  └─ Validation every 500 steps

Step 5: Model Saving
  └─ Save LoRA adapters
  └─ Save tokenizer
  └─ Merge with base model (optional)
  └─ Test inference
```

---

## 🧠 Custom Medical Adapter

### Architecture Overview

A **custom-designed neural network layer** specifically engineered to enhance the model's understanding of medical terminology, context, and reasoning patterns in Arabic medical consultations.

### Design Details

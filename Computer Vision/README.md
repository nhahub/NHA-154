# Brain Tumor Classification Using Deep Learning

A comprehensive deep learning project for classifying brain MRI images into four categories: Glioma, Meningioma, No Tumor, and Pituitary. This project explores custom CNN architectures, transfer learning with VGG16, data augmentation techniques, and provides model interpretability through Grad-CAM visualizations.

## 🎯 Project Overview

This project implements multiple approaches to brain tumor classification:
- Custom Convolutional Neural Network (CNN)
- Transfer Learning using pre-trained VGG16
- Data augmentation to handle class imbalance
- Grad-CAM visualizations for model interpretability
- Interactive Gradio interface for easy inference

## 📊 Dataset

**Source**: [Brain Tumor MRI Dataset](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset) from Kaggle

**Classes**:
- Glioma
- Meningioma
- No Tumor
- Pituitary

**Initial Training Distribution**:
- Glioma: 1,321 images
- Meningioma: 1,339 images
- No Tumor: 1,595 images
- Pituitary: 1,457 images

**After Augmentation**:
- All classes balanced to 1,595 images each

## 🚀 Installation

### Prerequisites
```bash
Python 3.8+
TensorFlow 2.x
```

### Required Libraries
```bash
pip install tensorflow
pip install kagglehub
pip install scikit-learn
pip install matplotlib
pip install opencv-python
pip install gradio
pip install numpy
pip install pillow
```

## 📁 Project Structure

```
brain-tumor-classification/
│
├── models/
│   ├── CNN_brain_tumor_V1.keras
│   ├── CNN_brain_tumor_aug_v2.keras
│   └── VGG16_Augmented_last_version.keras
│
├── dataset/
│   ├── Training/
│   │   ├── glioma/
│   │   ├── meningioma/
│   │   ├── notumor/
│   │   └── pituitary/
│   └── Testing/
│       ├── glioma/
│       ├── meningioma/
│       ├── notumor/
│       └── pituitary/
│
├── main.py
├── gradio_app.py
└── README.md
```

## 🔧 Usage

### 1. Download Dataset
```python
import kagglehub

path = kagglehub.dataset_download("masoudnickparvar/brain-tumor-mri-dataset")
print("Path to dataset files:", path)
```

### 2. Train Custom CNN
```python
# Load and preprocess data
train_ds = image_dataset_from_directory(
    train_dir,
    image_size=(150, 150),
    batch_size=32,
    label_mode='categorical'
)

# Train model
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=15
)
```

### 3. Train VGG16 with Transfer Learning
```python
# Load pre-trained VGG16
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze base layers
for layer in base_model.layers:
    layer.trainable = False

# Train with early stopping
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=50,
    callbacks=[early_stopping]
)
```

### 4. Launch Gradio Interface
```python
import gradio as gr

# Load trained model
loaded_model = tf.keras.models.load_model('VGG16_Augmented_last_version.keras')

# Launch interface
interface.launch(debug=True)
```

## 📈 Model Performance

### Custom CNN (Without Augmentation)
- **Test Accuracy**: 95.50%
- **Training Time**: 15 epochs

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| Glioma | 0.92 | 0.95 | 0.94 | 300 |
| Meningioma | 0.94 | 0.86 | 0.90 | 306 |
| No Tumor | 0.98 | 1.00 | 0.99 | 405 |
| Pituitary | 0.97 | 0.99 | 0.98 | 300 |

### VGG16 Transfer Learning (Without Augmentation)
- **Test Accuracy**: 95.04%
- **Training Time**: 21 epochs (early stopping)

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| Glioma | 0.97 | 0.87 | 0.92 | 300 |
| Meningioma | 0.85 | 0.96 | 0.90 | 306 |
| No Tumor | 0.99 | 1.00 | 1.00 | 405 |
| Pituitary | 0.99 | 0.95 | 0.97 | 300 |

### Custom CNN (With Augmentation)
- **Test Accuracy**: 96.19%
- **Training Time**: 30 epochs

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| Glioma | 0.94 | 0.94 | 0.94 | 300 |
| Meningioma | 0.93 | 0.91 | 0.92 | 306 |
| No Tumor | 1.00 | 0.99 | 0.99 | 405 |
| Pituitary | 0.97 | 1.00 | 0.98 | 300 |

### VGG16 Transfer Learning (With Augmentation) ⭐ **Best Model**
- **Test Accuracy**: 97.41%
- **Training Time**: 38 epochs (early stopping)

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| Glioma | 0.98 | 0.92 | 0.95 | 300 |
| Meningioma | 0.92 | 0.97 | 0.94 | 306 |
| No Tumor | 1.00 | 1.00 | 1.00 | 405 |
| Pituitary | 0.98 | 0.99 | 0.98 | 300 |

## 🔍 Key Features

### Data Augmentation
Applied to balance class distribution and improve generalization:
- Rotation (±20°)
- Width/Height shifts (10%)
- Zoom (20%)
- Horizontal flips
- Brightness adjustments (0.8-1.2)

### Grad-CAM Visualization
Provides visual explanations of model predictions by highlighting the regions in the MRI image that most influenced the classification decision.

```python
def make_gradcam_heatmap(img_array, model, last_conv_layer_name, pred_index=None):
    # Generate gradient-weighted class activation mapping
    # Returns heatmap showing important regions
    ...
```

### Interactive Interface
Gradio-based web interface allows users to:
- Upload brain MRI images
- Get instant predictions
- View Grad-CAM visualizations
- See prediction probabilities for all classes

## 🏗️ Model Architecture

### Custom CNN
```
- Rescaling Layer (1./255)
- Conv2D (32 filters, 3x3) + ReLU + MaxPooling
- Conv2D (64 filters, 3x3) + ReLU + MaxPooling
- Conv2D (128 filters, 3x3) + ReLU + MaxPooling
- Flatten
- Dense (128 units) + ReLU
- Dropout (0.5)
- Dense (4 units) + Softmax
```

### VGG16 Transfer Learning
```
- VGG16 Base (frozen, ImageNet weights)
- GlobalAveragePooling2D
- Dense (256 units) + ReLU
- Dropout (0.5)
- Dense (4 units) + Softmax
```

## 📝 Training Configuration

- **Optimizer**: Adam
- **Loss Function**: Categorical Crossentropy
- **Metrics**: Accuracy
- **Early Stopping**: Patience of 5 epochs
- **Batch Size**: 32
- **Image Size**: 224x224 (VGG16), 150x150 (Custom CNN)


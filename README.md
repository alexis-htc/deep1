# Building a Neural Network for Diabetes Risk Prediction

In this project, you will build and optimize a neural network to predict diabetes risk using real-world public health data. You’ll develop a complete machine learning workflow, from exploratory data analysis through model tuning and evaluation, designed for clinical decision support in healthcare settings.

**Read this README to discover:**

1. [Your Mission](#your-mission)  
   - [Dataset](#dataset)
2. [Getting Started](#getting-started)  
   - [Installation](#installation)  
   - [Project Structure](#project-structure)
3. [Project Instructions](#project-instructions)
4. [Project Workflow](#project-workflow)  
   0. [Set up the environment](#1-set-up-the-environment-10-min)  
   1. [Load and explore the dataset](#2-load-and-explore-the-dataset-45-min)  
   2. [Preprocess data](#3-preprocess-data-50-min)  
   3. [Design the model architecture](#4-design-the-model-architecture-40-min)  
   4. [Train the model](#5-train-the-model-60-min)  
   5. [Evaluate the model](#6-evaluate-the-model-50-min)  
   6. [Improve and tune the model](#7-improve-and-tune-the-model-60-min)  
5. [Deliverables](#deliverables)
6. [Evaluation](#evaluation)
7. [Built With](#built-with)
8. [License](#license)
9. [Appendix: Troubleshooting Guide](#appendix-troubleshooting-guide)

---

## Your Mission

**Company:** UdaciHealth  
**Client:** Regional hospital network  
**Problem:** Limited resources for comprehensive diabetes testing across thousands of monthly patients  
**Solution:** Automated pre-screening system to prioritize diagnostic testing  

**Success criteria:**  
Build a classifier that catches most diabetic patients (high recall) while minimizing false alarms (acceptable precision), enabling efficient resource allocation for follow-up testing.

**Key stakeholders:**
- Clinical team (needs interpretable, actionable results)  
- Hospital administrators (cost-effectiveness concerns)  
- IT department (requires deployment-ready model)  

### Dataset
**Source:** [CDC Diabetes Health Indicators Dataset](https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset)  
**Size:** ~50,000 survey responses with 50% diabetic and 50% non-diabetic entries (balanced subset from original 253K)  
**Features:** 21 health and lifestyle indicators including:
- Demographics (age, sex)  
- Physical measurements (BMI, blood pressure)  
- Lifestyle factors (smoking, physical activity)  
- Medical history (high cholesterol, stroke, heart disease)  

**About the balanced dataset**: The original CDC data has ~14% diabetes prevalence. We've balanced this to 50-50 by downsampling the majority class—a valid production strategy when you have sufficient minority samples. This lets you focus on neural network fundamentals first, with more detail on this decision in the notebook.

---

## Getting Started

These instructions will help you set up your development environment and understand the project structure.

### Installation

> For Udacity students: If you are running in Udacity's hosted environment, you can skip installation.

1. Clone this repository.

```sh
git clone <repo-name>
cd starter-kit
```

2. All dependencies for the project are collected in the `requirements.txt` file.  

Install for your environment by running:
```sh
pip install -r requirements.txt
```

Verify your installation by importing the key libraries:

```python
import torch
import pandas as pd
import sklearn
print(f"PyTorch version: {torch.__version__}")
```

### Project Structure
```
├── starter-kit/
│   │
│   ├── diabetes_prediction_mlp.ipynb - Main project notebook (all work done here)
│   │
│   └── data/
│      ├── diabetes_data.csv - CDC Diabetes Health Indicators dataset
│      └── data_dictionary.md - Feature descriptions and clinical context
│
├── .gitignore 
├── README.md 
└── requirements.txt
```

---

## Project Instructions
Your task is to build and optimize a multi layer perceptron (MLP) classifier for diabetes risk prediction while meeting minimal clinical requirements:

- [ ] Define a reasonable better-than-average baseline model on your chosen metrics
- [ ] Demonstrate systematic improvement (5%+ on top metric) through experimentation  

Within the `diabetes_prediction_mlp.ipynb` notebook, you will find **TODOs** guiding you through each step.

**IMPORTANT:** The notebook provides comprehensive guidance with hints and reference links for each TODO. Read all markdown explanations carefully—they contain critical context for healthcare applications.

---

## Project Workflow
Your main workspace is the `diabetes_prediction_mlp.ipynb` notebook.

> For non-Udacity students: If you are not running in Udacity's hosted environment, set up with [JupyterLab](https://jupyter.org/) locally or through another host.

The notebook is organized into 8 sections (~5-6 hours total):

### 1. Set up the environment (10 min)
- Import libraries and configure environment  
- Set random seeds for reproducibility  
- _(If available)_ Set GPU execution

### 2. Load and explore the dataset (45 min)
- Load CDC diabetes dataset (50,000 patients, 21 features)  
- Perform exploratory data analysis  
- Understand the class label distribution
- Analyze feature correlations with diabetes  

### 3. Preprocess the dataset (50 min)
- Create stratified train/validation/test splits (60/20/20)  
- Apply normalization (following "The Golden Rule")  
- Convert data to PyTorch tensors  
- Create DataLoaders for efficient batching  

### 4. Design the model architecture (40 min)
- Design multi-layer perceptron (MLP) with appropriate depth/width  
- Implement forward pass and verify tensor shapes  
- Configure loss function and optimizer

### 5. Train the model (60 min)
- Implement complete training loop with forward/backward passes  
- Train for multiple epochs with validation monitoring  
- Plot and interpret training/validation loss curves  
- Diagnose overfitting or underfitting  

### 6. Evaluate the model (50 min)
- Generate predictions on test set  
- Calculate clinical metrics (precision, recall, F1-score, accuracy)  
- Create confusion matrix with healthcare interpretation  
- Analyze ROC curve and AUC score  
- Provide clinical performance recommendations  

### 7. Improve and tune the model (60 min)
**Required:**  
- Implement dropout regularization  
- Experiment with learning rate tuning  
- Adjust network architecture (depth/width)  

**Student Choice:** Brainstorm 1–2 additional techniques:
- Weight decay (L2 regularization)  
- Early stopping  
- Batch size experimentation  
- Learning rate scheduling  
- ...

Reflect on experiments and document findings.

---

## Deliverables
- [ ] Completed notebook with all code cells executed  
- [ ] Implementation of all required improvement techniques  
- [ ] At least 1–2 student-choice improvement techniques explored
- [ ] Final reflection on experimental results 

---

## Evaluation
Your project will be evaluated based on:

- ✔️ **Data Handling** - Proper EDA, stratified splitting, normalization, and DataLoader implementation  
- ✔️ **Model Design** - Appropriate MLP architecture with correct activations and loss functions  
- ✔️ **Training Loop** - Complete implementation with proper gradient handling and convergence analysis  
- ✔️ **Evaluation** - Comprehensive metrics with clinical interpretation and deployment recommendations  
- ✔️ **Improvement** - Systematic experimentation with 3 required techniques + 1–2 brainstormed ideas
- ✔️ **Clinical Context** - Thoughtful interpretation of results in healthcare setting  

---

## Built With
- **PyTorch** - Deep learning framework  
- **scikit-learn** - Machine learning tools for preprocessing and evaluation  
- **Pandas** - Data manipulation and analysis  
- **Matplotlib** - Data visualization  

---

## License
[License](../LICENSE.md)

---

## Appendix: Troubleshooting Guide

**Issue: Loss is NaN**
- **Cause**: Learning rate too high or data not normalized
- **Solution**: Lower learning rate (try 0.0001) or check data preprocessing

**Issue: No learning (flat loss)**
- **Cause**: Learning rate too low or all zero inputs
- **Solution**: Increase learning rate or verify data is not all zeros

**Issue: Rapid overfitting**
- **Cause**: Model too complex for dataset size
- **Solution**: Add dropout, reduce layer sizes, or use weight decay

**Issue: Slow training**
- **Cause**: Batch size too small or CPU-bound
- **Solution**: Increase batch size or enable GPU if available

**Issue: Shape mismatch errors**
- **Cause**: Incorrect tensor dimensions
- **Solution**: Print shapes at each step, verify input/output dimensions
---
title: Reptile Installation Guide
description: A step-by-step guide to install and run the Reptile project.
---

### Quick Summary

1. Clone the repo: [Reptile GitHub page](https://github.com/Columbia-DESDR/Reptile)  
2. Install required packages: `pip install -r requirements.txt`  
3. Set flask environment variables:  
   - **Windows:** `set FLASK_APP=app.py`, `set FLASK_ENV=development`  
   - **Mac/Linux:** `export FLASK_APP=app.py`, `export FLASK_ENV=development`  
4. Start the site: `flask run` or `python3 app.py`

### What You Need

- A computer with MacOS (for PC users, use Ubuntu in a VM)  
- Basic familiarity with the Terminal app

### Step 1: Software Requirement Specifications - Install Python

- Make sure you have Python installed by typing `python --version` into Terminal. If you don’t, download it from [Python's website](https://www.python.org/downloads/).

### Step 2: Download Reptile from GitHub

1. Visit the [Reptile GitHub page](https://github.com/Columbia-DESDR/Reptile)  
2. Use the green "Code" button to find the SSH option and copy the link provided, i.e., `git@github.com:Columbia-DESDR/Reptile.git`  
3. In Terminal, navigate to where you want the project. For example:

   ```bash
   cd ~/Desktop
   mkdir reptile
   cd reptile
   ```

4. Clone the repo:

   ```bash
   git clone git@github.com:Columbia-DESDR/Reptile.git
   ```

5. Optional: Switch branches with `git checkout [branch-name]` if needed.

### Step 3: Run Reptile Locally

1. In the reptile folder, you should see a `requirements.txt` file. Run the command to install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Set up Flask environments based on your operating system:  

   - **Windows:**  

    ```bash
    set FLASK_APP=app.py
    set FLASK_ENV=development
    ```

   - **Mac/Linux:**

    ```bash
    export FLASK_APP=app.py
    export FLASK_ENV=development
    ```

3. Start the site:

   ```bash
   flask run
   ```

4. Terminal will give you a local URL (like `http://127.0.0.1:xxxx/`). Paste it in your browser to see your site live!
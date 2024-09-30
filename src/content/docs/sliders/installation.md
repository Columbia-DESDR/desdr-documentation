---
title: Sliders Installation Guide
description: A step-by-step guide to install and run the Sliders project.
---

### Quick Summary

- Clone the repo: [svelte-pi GitHub page](https://github.com/Columbia-DESDR/Sliders)
- Start the site: `npm run dev`

### What You Need

- A computer with MacOS (for PC users, use Ubuntu in a VM)
- Basic familiarity with the Terminal app

### Step 1: Software Requirements Specification 

#### Install Node.js and NPM Manually

- **Get Node.js:** Go to [Node.js Downloads](https://nodejs.org/en/download/package-manager) and choose the installer for MacOS. Follow the prompts to install.
- **Check Installation:** Open Terminal and type `node -v` and `npm -v`. If you see version numbers (like v18.0.1), you're set! If not, the installation might need a do-over.

#### Alternate: Install Node.js and NPM using Terminal (untested)

1. Get Node.js

    ```bash
    sudo apt update
    sudo apt install nodejs
    sudo apt install npm
    ```

2. Check Installation

    ```bash
    node -v
    npm -v
    ```

### Step 2: Get the Project Files

Choose one of the following methods based on your access and preference:

#### Option A: GitHub (if you have access)

1. Visit the [svelte-pi GitHub page].
2. Use the green "Code" button to find the SSH option and copy the link provided, i.e. `git@github.com:Columbia-DESDR/svelte-pi.git`.
3. In Terminal, navigate to where you want the project. E.g.:

    ```bash
    cd ~/Desktop
    mkdir sliders
    cd sliders
    ```

4. Clone the repo:

    ```bash
    git clone git@github.com:Columbia-DESDR/svelte-pi.git
    ```

5. Optional: Switch branches with `git checkout [branch-name]` if needed.

#### Option B: Zipped File (no GitHub access)

1. Go to the DESDR team's Google Drive and download `temp_install.zip`.
2. Unzip it wherever you prefer.

### Step 3: Launch Your Website

1. Open Terminal and navigate to the project folder. 
   E.g. `cd ~/Desktop/sliders/svelte-pi` or wherever you placed it.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the site:

    ```bash
    npm run dev
    ```

4. Terminal will give you a local URL (like `http://localhost:xxxx/`). Paste it in your browser to see your site live!
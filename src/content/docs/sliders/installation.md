---
title: Sliders Installation Guide
description: A step-by-step guide to install and run the Sliders project.
---

## Quick Summary

- Clone the repo: [Sliders GitHub page](https://github.com/Columbia-DESDR/Sliders)
- Start the site: `npm run dev`
- [Video Guide](https://watch.screencastify.com/v/XS0EzQZLnZ6mUTkICRdq)

## What You Need

- A computer with MacOS / Windows
- Basic familiarity with the Terminal app

## Step 1: Software Requirements

- **Install Node.js:** Go to [Node.js Downloads](https://nodejs.org/en/download/) and choose the installer for MacOS/Windows. Follow the prompts to install.
- **Install Git:** Go to [Git Downloads](https://git-scm.com/downloads) and choose the installer for MacOS/Windows. Follow the prompts to install.
- **Install Visual Studio Code:** Go to [VS Code Downloads](https://code.visualstudio.com/download) and choose the installer for MacOS/Windows. Follow the prompts to install.
- **Check Installation:** Open Terminal and type `node -v`, then `npm -v`, and finally `git -v`. If you see version numbers (like v18.0.1), you're set! If not, the installation might need a do-over.

## Step 2: Get the Project Files

Choose one of the following methods based on your access and preference:

### Option A: GitHub WorkSpaces Clone (if you have access)

1. Visit the [Sliders GitHub page](https://github.com/Columbia-DESDR/Sliders)
2. Navigate to the URL. Replace “github.com” with “github.dev”
3. Navigate to the terminal. If the terminal does not appear, click the search bar at the top and type “>Terminal”.
4. Once there, click “Continue Working in New Local Clone”. This will open the app inside Visual Studio Code.
5. Save the project files on your computer at any destination.

### Option B: GitHub HTML Clone (if you have access)

1. Visit the [Sliders GitHub page](https://github.com/Columbia-DESDR/Sliders)
2. Use the green "Code" button to find the SSH option and copy the link provided, i.e. `https://github.com/Columbia-DESDR/Sliders.git`
3. In Terminal, navigate to where you want the project. E.g.:

    ```bash
    cd ~/Desktop
    mkdir sliders
    cd sliders
    ```
4. Clone:

    ```bash
    git clone https://github.com/Columbia-DESDR/Sliders.git
    ```
5. Optional: Switch branches with `git checkout [branch-name]` if needed.

## Step 3: Launch Your Website

1. Open Terminal and navigate to the project folder.  
   E.g. `cd ~/Desktop/sliders/Sliders` or wherever you placed it.
2. Install dependencies:

    ```bash
    npm install
    ```
3. Start the site:

    ```bash
    npm run dev
    ```
4. Terminal will give you a local URL (like `http://localhost:xxxx/`). Paste it in your browser to see your site live!


[def]: https://watch.screencastify.com/v/XS0EzQZLnZ6mUTkICRdq
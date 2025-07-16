---
title: "Sliders New Deployment Guide"
description: This guide outlines the steps required to update and deploy the Sliders tool for a new country using the BambooDuck data processing pipeline.
---

## Overview
This guide outlines the steps required to update the Sliders tool to include data for a new country using the BambooDuck data processing pipeline and deployment workflow.

## Step 1: Raw Data Format
You'll need to prepare five different CSV files with specific data types and formats as given below:

### Admin File
- **Purpose:** Contains regional data specific to your country.
- **Required Headers:**
    - `gid`: A unique serial ID for each region.
    - `region`: Name of the region.
    - `chirps_early_first`, `chirps_early_last`, `chirps_late_first`, `chirps_late_last`: Specific dekad periods relating to rainfall seasons. These values are the default for the chirps_early and chirps_late Sliders window.
    - `evi_month`: Indicates the month for vegetation index monitoring.

### Badyear File
- **Purpose:** Indicates which years were particularly bad for each region.
- **Required Headers:**
    - `gid`: Region identifier.
    - `year`: The year in question.
    - `variable`: Index ranking the severity of the year (e.g., 1st worst).
    - `is_bad_year`: A boolean (true/false) indicating if it was a bad year.

### Chirps File
- **Purpose:** Contains rainfall data for each ten-day period (dekad).
- **Required Headers:**
    - `dekad`: The specific ten-day period (1–36 or 37–54 depending on the hemisphere).
    - `year`: The year of the data.
    - `value`: Rainfall measurement in mm.
    - `gid`: Region identifier.

### EVI File
- **Purpose:** Contains vegetation index data for each dekad.
- **Required Headers:**
    - `year`: The year of the data.
    - `value`: Vegetation index (0–1000 range).
    - `gid`: Region identifier.
    - `dekad`: The specific ten-day period (1–36).

### Crop Calendar File
- **Purpose:** Defines agricultural seasons and timing.
- **Required Headers:**
    - `gid`: Region identifier.
    - `crop`: Crop type.
    - `activity`: Agricultural activity (planting, harvesting, etc.).
    - `start_time`: Start date.
    - `end_time`: End date.

## Step 2: Setting Up BambooDuck and Data Preparation
**Repository:**  
[SlidersDataSetup-BambooDuck](https://github.com/Columbia-DESDR/SlidersDataSetup-BambooDuck)

### A. Setting up your workspace
1. **Clone the BambooDuck Repository (Terminal version):**
```bash
git clone https://github.com/Columbia-DESDR/SlidersDataSetup-BambooDuck
cd SlidersDataSetup-BambooDuck
```
2. **Go to the bangladesh branch:**
```bash
git checkout bangladesh
```
In the `Cleaning Scripts_bangladesh` folder you will find 5 python scripts used for data cleaning. They are named `generate_filename.py`.
3. **Create a New Branch:**
```bash
git checkout -b yournewcountry
```

### B. Data Processing
- Copy the cleaning scripts over and make adjustments specific to your region.
- **Note:**
    - Make sure the input and output folders have the right path and names.
    - Check the data type and column names to match your specific implementation.
- **Organize Files and Scripts:**
    - **Input Files:** Place all raw input CSV files in a working directory.
    - **Cleaning Scripts:** You can copy cleaning scripts from the bangladesh branch and edit them as needed.
    - **Output Files:** Save the final formatted CSV files in the `seeds` folder in BambooDuck and the parquet files in a folder called `output` (these are the files you will use for your new deployment of the sliders).

## Step 3: Generate Model Output Using BambooDuck (Query Building)
The BambooDuck is a time-effective and less error-prone method of adjusting the model_out file, the "recipe book" of the slider. By adjusting the Macros and Models you can generate a `model_out.json` file which contains SQL queries. These SQL query templates are the actual drought/flood detection algorithms—when you move sliders in the UI, these queries re-execute with new parameters to calculate drought severity scores in real-time. The queries serve as both the data processing logic and the mathematical models that power all the charts, tables, and visualizations in the config.

- The Bangladesh branch of BambooDuck is specific to Bangladesh and some Models and Macros are edited and renamed. It could be useful to look at the main branch as well.

### Update Variables in `dbt_project.yml`:
- The values in this YAML file are specific to a country, so be sure to adjust them if needed.

### Updating the Macros
- These contain reusable SQL templates (like `sum_early`, `sum_late`) that define the core drought/flood calculation logic and can be called from multiple models to avoid code duplication.

### Updating the Models
- These contain the actual query definitions that use the macros to build complete analytical workflows, which then get compiled into the final SQL queries that power the sliders.

### Run the BambooDuck:
```bash
python main.py -p dbt_project.yml
```
This will output a `model_out.json` that contains the queries only (not in the form of the slider `model_out.ts`).

### Convert for Sliders:
- This python script automatically translates compiled SQL queries from the JSON into the TypeScript format required by the Sliders, handling formatting and variable syntax conversion.
```bash
python converter.py
```

### Verify Output:
- Ensure `model_out.ts` files are generated successfully. This model_out file is ready to replace the preexisting one on sliders. You can do this as many times as needed to make the Sliders work properly.

## Step 4: Deploying the New Sliders
This step includes setting up Sliders for a new deployment and hosting a repository.

### A. Branch Creation
After the modification step above, create a new branch for your new deployment. It’s usually easier to start working from other branches and making specific changes.
```bash
git checkout -b new_country [ previous branch you are working from]
```

### B. Data and Configuration Updates
- Replace static folder data with New_country parquet files from the cleaning scripts you ran on BambooDuck and organized files in the output folder.
- Update `src/assets/config.yml` for slider min/max, chart year domains, and backend year defaults.
- Replace the model_out file by the one you made from BambooDuck in the `src/context/parameters/` folder.

### C. Creating a new Convex Table
The Convex database is where the user of the sliders can save an instance of the sliders and retrieve them with the same username.

1. First, you will need to have access to the team’s Convex database account.
2. Then, create `NewCountry_Data` and `NewCountry_State` tables on Convex.
3. Try saving from your new slider and see where it saves.
4. After you find out where, search up the data table name in VS Code.
5. You will find that it is referenced in the `config.yml` file and the dashboard’s `page.svelte` files.
6. Change both to your new data tables.
7. Test if it works and push the changes if it does.

### D. Building and Deploying
- When everything looks good, you can build and host the new sliders!
- Push your latest version of the sliders to the remote repository as a new branch:
```bash
git commit -m "last commit message"
git push -u origin <branch name>
```
- Build the new branch:
```bash
npm install
npm run dev # When everything works
npm run build
npm run preview # you can preview your build before hosting
```

#### Create New GitHub Repository:
- Repository name: `Sliders-[YourCountry]` (e.g., Sliders-Bangladesh) in DESDR
- Clone the Repository:
```bash
git clone https://github.com/DESDR/Sliders-YourCountry
cd Sliders-YourCountry
```

#### Prepare for Deployment:
- The build process from your new sliders adaptation creates a `docs/` folder.
- Copy the `docs/` folder to the new repository you created in step 2.
- Add a `.nojekyll` file both inside and outside the `docs/` folder (don't worry, it's an empty file).
- Copy a `README.md` from any existing branch and update with your country-specific information like name and satellite information.

#### Commit to GitHub:
```bash
git add .
git commit -m "last commit message"
# This is crucial: please copy and paste your last commit message of your new branch from the sliders repo to the new repository
git push
```

### Access Your Deployment:
GitHub will provide a URL like `https://columbia-desdr.github.io/Sliders-[new branch]` where your Sliders tool is hosted. The deployment typically takes a few minutes to become available. Now you have a new working deployment!

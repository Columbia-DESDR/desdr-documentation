---
title: 'Sliders Deployment Guide'
description: This guide outlines the steps required to update the Sliders tool to include data for Senegal.
---

This guide outlines the steps required to update the Sliders tool to include data for Senegal.

### Step 1: Raw Data Format

You'll need to prepare five different CSV files with specific data types and formats as given below:

1. **Admin File**  
   - **Purpose**: Contains regional data specific to Senegal.  
   - **Required Headers**:  
      - `gid`: A unique serial ID for each region.  
      - `region`: Name of the region.  
      - `status`: Comments about the region (details may vary).  
      - `evi_month`: Indicates a month related to vegetation data (exact purpose needs clarification).  
      - `chirps_early_first`, `chirps_early_last`, `chirps_late_first`, `chirps_late_last`: Specific dates relating to rainfall periods.  

2. **Badyear File**  
   - **Purpose**: Indicates which years were particularly bad for each region.  
   - **Required Headers**:  
      - `gid`: Region identifier.  
      - `year`: The year in question.  
      - `variable`: Index ranking the severity of the year (e.g., 1st worst).  
      - `is_bad_year`: A boolean (true/false) indicating if it was a bad year.  

3. **Chirps File**  
   - **Purpose**: Contains rainfall data for each ten-day period (dekad).  
   - **Required Headers**:  
      - `dekad`: The specific ten-day period.  
      - `year`: The year of the data.  
      - `value`: Rainfall measurement.  
      - `gid`: Region identifier.  

4. **Evi File**  
   - **Purpose**: Contains vegetation index data for each dekad.  
   - **Required Headers**:  
      - `year`: The year of the data.  
      - `value`: Vegetation index (0-1000 range).  
      - `gid`: Region identifier.  
      - `dekad`: The specific ten-day period.  

5. **Crop Calendar File**: Ensure it matches the required structure and format for integration into the Sliders tool.

### Step 2: Preparing Raw Data

Repo name: [Sliders Tool Senegal Branch](https://github.com/Columbia-DESDR/ethiopia/tree/senegal)

This repository contains all necessary scripts to convert the provided data into the required formats. Developers will need to create or modify scripts based on the specific raw input CSV files provided.

#### Setting up Your Workspace

1. **Create a New Branch**: Start by creating a new branch in the repository, naming it after the country, for example, `Senegal`.  
2. **Organize Files and Scripts**:  
   - **Input Files**: Place all input CSV files in the `dbt/pre_process_csv_stage` folder.  
   - **Output Files**: Save the final formatted CSV files in the `python_scripts/raw_data` folder.  
   - **Scripts**: Find all Python scripts needed for data conversion in the `python_scripts` folder. Adjust these scripts as required based on the data processing needs.

#### Data Conversion Steps (Example: Senegal)

1. **admin_raw.csv**: Assign GIDs to all regions, drop unnecessary columns, and rename columns as required. The input raw file is `default_admin.csv`.  
2. **badyear.csv**: Prepare the data using `badyear_preprocess.py`, then run `badyear_convert.py` to convert the data into a binary format indicating bad years.  
3. **chirps.csv**: Use `chirps_convert.py` to convert the data into the desired format.  
4. **evi.csv**: Use `evi_convert.py` to merge all EVI files and format the data as required.

### Step 3: Setting up the Database for the New Country

[DBT Setup for Mac](https://github.com/Columbia-DESDR/dbt/blob/main/setup/DBT_Mac_README.md)

1. Install PostgreSQL  
2. Create a database named `desdr`  
3. Create a role named `fist`  
4. Follow the instructions in the linked README.

**Note**:

- In `dump.sql`, change the owner to your PostgreSQL superuser and run `psql desdr < dump.sql`.
- Ensure the schemas are ready.  
- Grant permissions to the `fist` user.

### Step 4: Setting up the DBT Tool for the New Country

1. Update `dbt_project.yml` for the new region profile.  
2. Make necessary changes to variables in the YAML file.  
3. Ensure the DBT profile is set to the correct database or run `db init` and add the following information:

    ```yml
    DESDR_APPS:
    target: dev
    outputs:
        dev:
        type: postgres
        host: localhost
        user: fist
        password: fist
        port: 5432
        dbname: desdr
        schema: dbt_results
        threads: 1
    ```

4. Move your raw CSV files to the seed folder.  
5. Run `dbt seed` to convert CSV files into tables in the database.  
6. Update models and macros as required for the new region.  
7. Run models with `dbt run`.  
8. Generate documentation: `dbt docs generate` and `dbt docs serve`.

### Step 5: Exporting Data from the DBT Tool for Sliders

1. Export `model_out.json` using the command `dbt client --write`.  
2. Move the `model_out.js` file into the `assets` folder in the Svelte-Pi repository if needed.  
3. For raw data, run the `PATH/python_scripts/seed_loader.py` script.  
4. Ensure data is in INTEGER, VARCHAR, and BOOLEAN format when loaded into DuckDB, or use `seed_loader_new.py`.  
5. The `./database` folder will have an updated `schema.sql`.  
6. Produce `.parquet` files by running `PATH/python_scripts/re_exporter.py`.  
7. Move the `.parquet` files to the static folder for your dashboard deployment in Svelte-Pi.

### Step 6: Integrating New Data in the Sliders Repository

1. Update `config.yml` files to reflect the correct `start_year`, `end_year` variables for the new data.  
2. Ensure the queries in the YAML files match the new data.  
3. The Sliders app should now pick up the new data and render the updated interface.

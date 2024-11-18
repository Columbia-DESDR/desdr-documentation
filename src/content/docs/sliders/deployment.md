---
title: "Sliders Deployment Guide"
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
        - `chirps_early_first`, `chirps_early_last`, `chirps_late_first`, `chirps_late_last`: Specific dates relating to rainfall periods.

2. **Badyear File**

    - **Purpose**: Indicates which years were particularly bad for each region.
    - **Required Headers**:
        - `gid`: Region identifier.
        - `year`: The year in question.
        - `variable`: Index ranking the severity of the year (e.g., 1st = worst year).
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

5. **Crop Calendar File**:

    - **Purpose**: Contains planting period data for each crop for each region.
    - **Required Headers**:
        - `gid`: Region identifier.
        - `crop`: Name of the crop.
        - `activity`: Type of activity (e.g., planting, harvesting).
        - `start_time`, `end_time`: Start and end dates for the activity.

6. **Config File**:

    - **Purpose**: Contains configuration data for the data conversion scripts.
    - **Example**: Example `config.json` file is shown below:

```
config.json

{
    "names_to_ids": {
        "Lapai": 1128,
        "Minna": 1754,
        "Mokwa": 1755,
        "Moro": 1494
    },
    "year_min": 1990,
    "year_max": 2023
}

```

### Step 2: Preparing Raw Data

Repo name: [Sliders Data Setup (data-setup Branch)](https://github.com/Columbia-DESDR/ethiopia/tree/data-setup)

This repository contains all necessary scripts to convert the provided data into the required formats. Developers will need to create or modify scripts based on the specific raw input CSV files provided.

#### Setting up Your Workspace

1. **Create a New Branch**: Start by creating a new branch in the repository, naming it after the country, for example, `Senegal`.
2. **Organize Files and Scripts**:
    - **Input Files**: Place all input CSV files in the `python_scripts/data/csv_preprocessed` folder.
    - **Output Files**: Final formatted CSV files are saved in the `python_scripts/data` folder.
    - **Scripts**: Find all Python scripts needed for data conversion in the `python_scripts` folder. Adjust these scripts as required based on data processing needs.

#### Data Conversion Steps

1. Set up the `config.json` file located at `python_scripts/data/config.json` (example file above).
2. Run the following scripts to convert input file data into the required format:

    - **badyear.py**: Converts the badyear file.
    - **chirps.py**: Converts the chirps file.
    - **evi.py**: Converts the evi file.
    - **crop_cal.py**: Converts the crop calendar file.

    Note: A script for `admin.csv` is not required since the admin file should already in the correct format. If it is not, you can write your own script. The proper format is given in the previous section.

### Step 3: Setting up the Database for the New Country

#### Option 1: Use the `csv_to_parquet.py` Script

1. **csv_to_parquet.py** : Run this script for each .csv file to convert them into .parquet files.

For Sliders to work properly, you need to create the following Parquet files:

-   `admin_raw.parquet`
-   `badyear_raw.parquet`
-   `chirps_raw.parquet`
-   `evi_raw.parquet`
-   `crop_cal_raw.parquet`

2. Copy the Parquet files to the `static` folder in your Svelte-Pi repository.

#### Option 2: Set up a PostgreSQL Database

##### Step 1: Setting up the Database for the New Country

[DBT Setup for Mac](https://github.com/Columbia-DESDR/dbt/blob/main/setup/DBT_Mac_README.md)

1. Install PostgreSQL
2. Create a database named `desdr`
3. Create a role named `fist`
4. Follow the instructions in the linked README.

**Note**:

-   In `dump.sql`, change the owner to your PostgreSQL superuser and run `psql desdr < dump.sql`.
-   Ensure the schemas are ready.
-   Grant permissions to the `fist` user.

#### Step 2: Setting up the DBT Tool for the New Country

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

#### Step 5: Exporting Data from the DBT Tool for Sliders

1. Export `model_out.json` using the command `dbt client --write`.
2. Move the `model_out.js` file into the `assets` folder in the Svelte-Pi repository if needed.
3. For raw data, run the `PATH/python_scripts/seed_loader.py` script.
4. Ensure data is in INTEGER, VARCHAR, and BOOLEAN format when loaded into DuckDB, or use `seed_loader_new.py`.
5. The `./database` folder will have an updated `schema.sql`.
6. Produce `.parquet` files by running `PATH/python_scripts/re_exporter.py`.
7. Move the `.parquet` files to the static folder for your dashboard deployment in Svelte-Pi.

### Step 4: Integrating New Data in the Sliders Repository

1. Update `config.yml` files to reflect the correct `start_year`, `end_year` variables for the new data.
2. Ensure the queries in the YAML files match the new data.
3. The Sliders app should now pick up the new data and render the updated interface.

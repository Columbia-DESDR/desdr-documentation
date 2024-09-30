---
title: Reptile Modification Guide
description: A guide to modify the Reptile application and manage data updates.
---

### Getting Started

1. Make sure you've followed the [Reptile installation guide](./installation).  
2. Ensure you have the DBeaver IDE installed.

### Part 1: Updating Application or Data

- **When to Do This:** Update if you need to change the application or the data in CSV files.  
- Navigate to the Reptile folder on your computer using Terminal:  

  ```bash
  cd ~/Desktop/DESDR/Reptile
  ```

- To update data, modify files in the `db` folder. After making changes, use the following commands to update the testing branch:  

  ```bash
  git add .
  git commit -m "your update message"
  git push origin [branch]
  ```

- **Important:** Keep the data format in CSV consistent. The application is sensitive to quotation parsing and column names, so any new data should match the formatting style of existing data. To transform new data into the necessary format, it is recommended to use terminal commands such as `sed` or `awk` to avoid issues with triple quotation marks that commonly arise when using Python scripts, PowerBI, Excel, etc.

### Part 2: Using Reptile on Amazon Cloud

> **Note:** Restart the application or processes only if you've added new data. Otherwise, just ensure you have access.

- Get the SHA key (.pem file) from DESDR's Google Drive.  
- Open Terminal and connect via SSH using the following command:  

  ```bash
  ssh -i "path-to-your-.pem-file" ubuntu@ec2-18-117-152-17.us-east-2.compute.amazonaws.com
  ```

  Replace `path-to-your-.pem-file` with your actual file path.
  - If access is denied, change the file's permissions with:

    ```bash
    chmod 400 path-to-your-.pem-file
    ```

- Once connected to the virtual machine, check processes with: 

  ```bash
  ps aux | grep gun
  ```  

  - Kill the top running instance using:  

    ```bash
    kill -9 PID
    ```  

  Wait about 10 seconds, then verify that only one process is running.  
- Pull any new updates from the testing branch with:  

  ```bash
  git pull [branchname]
  ```

  while in the Reptile directory.  
- Activate the new environment with: 

  ```bash
  conda activate reptile-new
  ```  

  then start the application with:  

  ```bash
  gunicorn -w 4 -b 0.0.0.0 'app:app' --daemon
  ```  

- Go to [http://ec2-18-117-152-17.us-east-2.compute.amazonaws.com/](http://ec2-18-117-152-17.us-east-2.compute.amazonaws.com/) in your browser to check that the application is running.

### Part 3: Accessing the Database (to extract feedback data)

- **What You Need:** Choose an IDE like DBeaver for database access.  
- **Setting Up a New Data Source:**  
  - Select **PostgreSQL**.  
  - Use these settings:  
    - **Host:** desdr.cp4iersqrqjv.us-east-2.rds.amazonaws.com  
    - **Port:** 5432  
    - **User:** postgre  
    - **Password:** Desdr#2023_ddssii  
    - **Database:** postgres  
- The feedback table is located under:  
  `postgres > schemas > reptile > feedback`
---
title: Running Noki
description: A reference guide to run Noki
---

After completing the setup requirements, follow these steps to run Noki:

### 1. Install Dependencies

- Navigate to the Noki directory and install the dependencies listed in the *requirements.txt* file. 
- **Note:** Some packages may be outdated. If you encounter errors, update the packages to their latest versions or to those specified in the error messages.

### 2. Configure Database Connection

- Ensure you have access to the database by either connecting to the VPN or using a local database.
- You will need to specify the database credentials in the *config.py* file under the variable `POSTGRES_CREDS`. 

- For a local database, your credentials should look similar to the example below (replace the user and password with your own):

```python
POSTGRES_CREDS = {
  'user': 'your_username',     # Replace with your username
  'password': 'your_password',  # Replace with your password
  'host': 'localhost',
  'port': '5432',
  'database': 'noki'
}
```

- If you're accessing the live database, obtain the necessary credentials from the contacts mentioned previously.

### 3. Run Noki

- Once the above steps are completed, you can run Noki locally:
- You can run the application directly from your Integrated Development Environment (IDE) or from the terminal.

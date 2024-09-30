---
title: Setup Instructions for Noki
description: A reference guide to install Noki
---

To run Noki locally, please follow these steps:

### 1. Access the Noki Repository on GitHub

- Request access to the Noki GitHub repository from Max Mauerman (<mmauerman@iri.columbia.edu>).
- After gaining access, you can clone the repository or access the code using a Git client.

### 2. Create a Twilio Account

- Sign up for a Twilio account at [Twilio Sign Up](https://login.twilio.com/u/signup?state=hKFo2SBic2c0aXdjVHBDcU9PTmxreFhsdHYyNk1UZVlzRF9DZqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIE11a0JPcE9qYmFScDJPZGtvQUV1aWpYcFdZTWFSQWoto2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks).
- Verify your email address and phone number.
- Request access to the IRI FIST Console from Max Mauerman (<mmauerman@iri.columbia.edu>). *[Information as of June 27th, 2024]*

### 3. Set Up ngrok

- Download ngrok, unzip, and install it on your local machine.
- Create a free account on ngrok.
- Copy your auth token from the ngrok dashboard.
- Open a terminal or command prompt and run:

  ```
  ngrok config add-authtoken YOUR_AUTHTOKEN
  ```

- To expose your local server, run:

  ```
  ngrok http 8000
  ```

*(Replace 8000 with your server's port as needed.)*

*Note:* The default port for Flask is 5000. If you're using Mac OS and encounter a 403 error, consider using port 8000 instead. Update the port in the *noki.py* program accordingly.

### 4. Access the IRI Database

You can access the IRI Database either live or via a local copy:

- **Live Access via VPN**:  
  - This requires approval from Max Mauerman (<mmauerman@iri.columbia.edu>) and Jeffrey Turmelle (<jefft@iri.columbia.edu>).  
  - Live access allows you to view and modify real-time information in the database.

- **Local Copy**:  
  - Obtain a SQL extract of the IRI Noki/Ikon database from Jeffrey Turmelle or another authorized user.
  - For detailed setup instructions, refer to the document: [Setting up Postgres for your Application Development](https://drive.google.com/file/d/1El48a_8Q3CJUflNOZi3MAOmmOU74FRWX/view?usp=drive_link).

*Note:* You may need to edit environmental variables to ensure the "psql" command works properly.

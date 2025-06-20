---
title: Noki Gamification Server Setup
description: This guide walks you through connecting to the server, setting up your environment the Noki Gamification application hosted via Apache.
---

This guide walks you through connecting to the server, setting up your environment, and deploying or updating the Noki Gamification application hosted via Apache., please follow these steps:

### 1. Connect to VPN

Ensure you are connected to the IRI VPN using **Tunnelblick** or any other approved VPN tool.


### 2. SSH Into the Server
Open your terminal and connect to the remote server:

````
ssh -l <user_name> fist.iri.columbia.edu
````

Replace <user_name> with your provided username. Enter the given password when prompted.

### 3. Project Directory Structure

The core project resides in:

````
/var/www/html/gamification/Noki

````

The gamification directory is linked to an existing user’s  Bitbucket repository (rgd2127).

The Noki subdirectory is linked to an existing user’s  GitHub repository (ritika1010).


### 4. Adding a New User / Setting Up Your Own Environment

For a new user to set up their own environment:

1. Backup existing directories:

````
mv /var/www/html/gamification /var/www/html/gamification_old
mv /var/www/html/gamification/Noki /var/www/html/gamification/Noki_old

````
2. Create personal GitHub and Bitbucket repositories under your username (ensure the names match to the existing names as it is expected in config).


3. Clone the repositories:

````
cd /var/www/html
git clone 
https://bitbucket.org/<your_bitbucket_username>/gamification.git
cd gamification
git clone https://github.com/<your_github_username>/Noki.git

````
4. Install and Build frontend changes:

````

cd frontend/admin-ui
npm install  # only if not done before
npm run build

````
5. Restart Apache to pick up new changes:

````
sudo /usr/bin/systemctl restart apache2

````

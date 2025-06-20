---
title: Running & Updating Noki
description: A reference guide to running and updating Noki
---

After completing the setup requirements, follow these steps to run & updating Noki:

### When pushing new changes to GitHub:
**1.** Push the changes to git from your local in the dev branch

**2.** SSH into the server and navigate to the Noki directory:

````
cd /var/www/html/gamification/Noki
git pull origin main  # or the appropriate branch
````
**3.** Build frontend changes:

````
cd frontend/admin-ui
npm install  # only if not done before
npm run build
````
**4.** Restart Apache server:

````
sudo /usr/bin/systemctl restart apache2

````

**5.** Check Apache status:

````
sudo /usr/bin/systemctl status apache2

````
### Debugging & Logs

To check for errors:

**1.** Navigate to the Apache logs directory:

````
cd /var/log/apache2
````
**2.** Open the noki-error_log to view detailed errors:

````
cat noki-error_log
# or to continuously monitor
tail -f noki-error_log

````
### Final Checklist
-Connected to VPN

-SSH access confirmed

-GitHub and Bitbucket repositories cloned

-Frontend built via npm run build

-Apache restarted and confirmed running

-Logs checked for any errors



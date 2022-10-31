### How to run the webhook.js

01. I used an Ubuntu 22.04.01 LTS server
02. Made sure nodejs was installed
03. Created a directory and cloned the webhook.js to this directory
04. Install npm package(s) needed `npm install express --save`
05. Create and enable this file as a service in systemd so it is always running and restarts on reboot
06. Open port 8080/tcp on Firewall on the server 
07. Get public IP from this server and use it for the payload URL in Webhook setup

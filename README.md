# slideshow.js

Minimalistic digital frame accessed via web.Fully managed remotely by git with optional Basic Authentication.

## Getting Started

1. Clone this project on your server.
```
git clone https://github.com/gbourant/slideshow.js
```

2. Create .slideshow.conf on your home folder.
```
touch ~/.slideshow.conf
```

3. Add these variables in the file you just created
```
IMAGE_REPO=https://github.com/gbourant/slideshow.js.git
DEPLOYMENT_DIR=~/.slideshow
```
<p>Set IMAGE_REPO with a link of git repository (create one,if you haven't) where you will store your images. On DEPLOYMENT_DIR set the path of the web server folder.<p>

4. Run the update.sh script and enjoy
<p>The digital frame is available on your domain name.</p>

## Add images

Create a git repository and push on it images.After that, run the update.sh script.

## Enable Basic Authentication

<p>You must have enabled the Basic Authentication on your web server. Access the digital frame via different link which has the username and the password on the query parameters.</p>

```
wwww.example.com/?username=demo&password=demo
```
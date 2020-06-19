# website
Full Stack Phaser Lab App

This web sandbox editor allows for the creation of Phaser 3 apps in the browser.

I deploy to Heroku using:
```
git push heroku master
```

To build the static client page run:

```
npm run heroku-postbuild
```

To start server run:
```
npm run start
```

You need a .env file in the root directory with the Mongo db URI in it:

```
ATLAS_URI=mongodb+srv://atlas:  ...
```


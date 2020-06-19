# MERN Stack Web Sandbox

Example running at http://moonpong.com


## Node

To build the static client page run:

```
npm run heroku-postbuild
```

To start server run:
```
npm run start
```

To run you database locally you will need a .env file in the root directory with the MongoDB Atlas URI in it:

```
ATLAS_URI=mongodb+srv://atlas:  ...
```


## Heroku CLI

Auth
```
heroku login
```

Init
```
heroku create
```

Debug:
```
heroku logs --tail
```


Add custom domain using heroku:

```
heroku domains:add www.moonpong.com
```

View domains:
```
heroku domains
```

List:
```
heroku run 'ls -al'
```

To run database on heroku set heroku environment variables (contents of .env):

```
heroku config:set ATLAS_URI=mongodb+srv://atlas: ...
```

Deploy:
```
git push heroku master
```


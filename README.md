# rn-google-maps

Install dependencies with

```
npm install
```

The project uses a fake API server so you have to run it. Run it with

```
npm install -g json-server
```

After installation, run the server by executing:

```
json-server --watch db.json
```

The server runs on port 3000.

Then you can start the project by running

```
npm run ios
```

or

```
npm run android
```

This will automatically install the Expo Go app on the desired simulator and attach the app to the Metro bundler.

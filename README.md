# Game of Life
[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) with randomly generated initial "population"

## Clone project

```
git clone https://github.com/DilyanaM/game-of-life.git && cd game-of-life
```

## Install dependencies
```
npm install
```

## Run the project
```
ng serve -o
```
This will run the dev server and open the app at [http://localhost:4200](http://localhost:4200) in the browser.

## Build the project
```
ng build
```
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
You can easily serve the built application in your browser by installing [angular-http-server](https://www.npmjs.com/package/angular-http-server) and running the following command in `dist/game-of-life/` directory:
```
angular-http-server -o
```

## Resources:
- [Angular CLI](https://github.com/angular/angular-cli) v8.3.9
- [Bootstrap](https://getbootstrap.com/) v4.3.1

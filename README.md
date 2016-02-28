#three-scene-nightcamp
---------------------

Scene creation with THREE.js.

![screen](http://i.imgur.com/Ch7rGFg.png)

Installation
-----------

```
npm i
```

Usage
-----

```javascript
import threeSceneNightcamp from 'three-scene-nightcamp';

const scene = threeSceneNightcamp({
  canvas: document.getElementById('myCanvas'),
  width: 600,
  height: 200,
});
```

Or use the development server:
```
npm start
```
And open [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)
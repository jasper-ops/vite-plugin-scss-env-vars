# vite-plugin-scss-env-vars

Provide env of Vite variables in scss files

## Install
```sh
npm i vite-plugin-scss-env-vars -D
```

## Usage
1. use plugin
```javascript
import ScssEnvVars from 'vite-plugin-scss-env-vars';

export default defineConfig(() => {
    return {
        // ...other configurations
        plugins: [
            ScssEnvVars()
        ],
        // ...other configurations
    }
});
```
2. define vars in `.env` files
```ini
VITE_FILE='https://xxx.xxx.com/images'
VITE_COLOR_PRIMARY='#fb0000'
```
3. use vite env in scss
```scss
.App {
    background-image: url('#{$VITE_FILE}/home.jpg');
    color: $VITE_COLOR_PRIMARY;
}
```

## Options

### 1. idFilter
Filter the file to be processed
* type: `RegExp | ((id: string) => boolean)`
* default: `/\.scss$/`

### 2. keyTransformer
If you don't want to use the original name of the VITE environment variable, you can convert the name by this callback function
* type: `(key: string) => string;`
* default: use original name
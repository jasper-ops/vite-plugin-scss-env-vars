# vite-plugin-scss-env-vars

Provide env of Vite variables in scss files

## Install
```sh
npm i vite-plugin-scss-env-vars -D
```

## Usage
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
import type { PluginOption } from 'vite';
import MagicString from 'magic-string';

interface ScssEnvVarsOptions {
    idFilter?: RegExp | ((id: string) => boolean);
    keyTransformer?: (key: string) => string;
}

const defaultIdFilter = /\.scss$/;
const allowedPrefix = 'VITE_';

function isAllowedVarKey(key: string, prefix: string | string[]) {
    if (typeof prefix === 'string') {
        return key.startsWith(prefix);
    } else {
        return prefix.some(item => key.startsWith(item));
    }
}

function ScssEnvVars(options: ScssEnvVarsOptions = {}): PluginOption {
    const {
        idFilter = defaultIdFilter,
        keyTransformer,
    } = options;
    let scssEnvVars = '';

    const keyTransformerIsFunction = typeof keyTransformer === 'function';

    return {
        name: 'vite-plugin-scss-env-vars',
        enforce: 'pre',
        configResolved({ envPrefix, env }) {
            scssEnvVars = Object.keys(env)
                .filter(item => isAllowedVarKey(item, envPrefix ?? allowedPrefix))
                .map(key => `$${keyTransformerIsFunction ? keyTransformer(key) : key}: #{'${env[key].replace(/'/g, '\\\'')}'};`)
                .join('\n');
        },
        transform(code, id) {
            if (!scssEnvVars) {
                return code;
            }

            if (typeof idFilter === 'function') {
                if (!idFilter(id)) {
                    return code;
                }
            } else if (idFilter instanceof RegExp) {
                if (!idFilter.test(id)) {
                    return code;
                }
            }

            const s = new MagicString(code);
            s.prepend(scssEnvVars);

            return {
                code: s.toString(),
                map: s.generateMap({ hires: true }),
            };
        },
    };
}

export default ScssEnvVars;

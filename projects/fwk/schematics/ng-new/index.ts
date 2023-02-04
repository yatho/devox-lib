import {
    Rule, apply, url, chain, mergeWith
} from '@angular-devkit/schematics';

export function ngNew(): Rule {
    return async () => {
        const sources = apply(url('./files'), []);
        return chain([
            mergeWith(sources)
        ]);
    };
}
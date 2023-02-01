import {
    apply, applyTemplates, chain, mergeWith, Rule, url
} from '@angular-devkit/schematics';
  
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

export function crudGenerator(options: Schema): Rule {
    return async () => {    
        const templateSource = apply(url('./files'), [
          applyTemplates({
            classify: strings.classify,
            dasherize: strings.dasherize,
            name: options.name
          })
        ]);
    
        return chain([
          mergeWith(templateSource)
        ]);
    };
}

// const upercase = (str: string) => str.toUpperCase();
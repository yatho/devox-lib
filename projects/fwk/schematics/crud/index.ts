import {
    Rule, Tree, SchematicsException,
    apply, url, applyTemplates, move,
    chain, mergeWith
  } from '@angular-devkit/schematics';
  
  import { strings, normalize, virtualFs, workspaces } from '@angular-devkit/core';

import { Schema } from './schema';

export function crudGenerator(options: Schema): Rule {
    return async (tree: Tree) => {
        const host = createHost(tree);
        const { workspace } = await workspaces.readWorkspace('/', host);

        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new SchematicsException(`Invalid project name: ${options.project}`);
        }

        const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

        const path = `${project.sourceRoot}/${projectType}`;
        const templateSources = apply(url('./files'), [
            applyTemplates({
                uppercase: (str: string) => str.toUpperCase(),
                classify: strings.classify,
                dasherize: strings.dasherize,
                name: options.name
            }),
            move(normalize(path))
        ]);
    
        return chain([
            mergeWith(templateSources)
        ]);
    };
}

function createHost(tree: Tree): workspaces.WorkspaceHost {
    return {
      async readFile(path: string): Promise<string> {
        const data = tree.read(path);
        if (!data) {
          throw new SchematicsException('File not found.');
        }
        return virtualFs.fileBufferToString(data);
      },
      async writeFile(path: string, data: string): Promise<void> {
        return tree.overwrite(path, data);
      },
      async isDirectory(path: string): Promise<boolean> {
        return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
      },
      async isFile(path: string): Promise<boolean> {
        return tree.exists(path);
      },
    };
  }
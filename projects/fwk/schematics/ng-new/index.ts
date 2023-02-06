import {
  MergeStrategy,
  Rule,
  chain,
  externalSchematic,
  mergeWith,
  apply,
  move,
  SchematicContext,
  Tree,
  url,
  empty,
} from '@angular-devkit/schematics';
//import { Rule, apply, url, chain, mergeWith, externalSchematic } from '@angular-devkit/schematics';

import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';

import {
  NodePackageInstallTask,
  NodePackageLinkTask,
  RepositoryInitializerTask,
} from '@angular-devkit/schematics/tasks';

export default function (options: NgNewOptions): Rule {
  return async () => {
    if (!options.directory) {
      // If scoped project (i.e. "@foo/bar"), convert directory to "foo/bar".
      options.directory = options.name.startsWith('@')
        ? options.name.slice(1)
        : options.name;
    }
    console.log('directory', options.directory);

    const workspaceOptions: WorkspaceOptions = {
      name: options.name,
      version: options.version,
      newProjectRoot: options.newProjectRoot,
      minimal: options.minimal,
      strict: options.strict,
      packageManager: options.packageManager,
    };
    const applicationOptions: ApplicationOptions = {
      projectRoot: '',
      name: options.name,
      inlineStyle: options.inlineStyle,
      inlineTemplate: options.inlineTemplate,
      prefix: options.prefix,
      viewEncapsulation: options.viewEncapsulation,
      routing: options.routing,
      style: options.style,
      skipTests: options.skipTests,
      skipPackageJson: false,
      // always 'skipInstall' here, so that we do it after the move
      skipInstall: true,
      strict: options.strict,
      minimal: true,
    };

    const workspace = externalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    const application = externalSchematic(
      '@schematics/angular',
      'application',
      applicationOptions
    );

    // TODO : Proposer un seul et unique fichier schema.json avec uniquement ce qui est modifiable dans le ng-new
    // TODO : Ajouter mes schematics à angular.json en tant que schematics par défault
    // "cli": {
    // "analytics": false,
    // "schematicCollections": ["@schematics/angular", "fwk"]
    //  }
    // TODO : Ajouter l'appel aux schematics de material pour initialiser avec material ng-add

    return chain([
      mergeWith(
        apply(empty(), [workspace, application, move(options.directory)])
      ),
      mergeWith(
        apply(url('./files'), [move(options.directory + '/src')]),
        MergeStrategy.Overwrite
      ),
      (tree: Tree) => {
        tree.delete(options.directory + '/src/app/app.module.ts');
      },
      (_host: Tree, context: SchematicContext) => {
        let packageTask;
        if (!options.skipInstall) {
          packageTask = context.addTask(
            new NodePackageInstallTask({
              workingDirectory: options.directory,
              packageManager: options.packageManager,
            })
          );
          if (options.linkCli) {
            packageTask = context.addTask(
              new NodePackageLinkTask('@angular/cli', options.directory),
              [packageTask]
            );
          }
        }
        if (!options.skipGit) {
          const commit =
            typeof options.commit == 'object'
              ? options.commit
              : options.commit
              ? {}
              : false;

          context.addTask(
            new RepositoryInitializerTask(options.directory, commit),
            packageTask ? [packageTask] : []
          );
        }
      },
    ]);
  };
}

import {
  CommandLineInputs,
  CommandLineOptions,
  normalizeOptionAliases,
  minimistOptionsToArray
} from '@ionic/cli-utils';

/**
 * Filter and gather arguments from command line to be passed to Cordova
 */
export function filterArgumentsForCordova(metadata: any, inputs: CommandLineInputs, options: CommandLineOptions): string[] {
  const results = normalizeOptionAliases(metadata, options);
  const args = minimistOptionsToArray(metadata, results);

  // clean out any cmds that may confuse cordova
  const ignoreCmds = [
    '--livereload',
    '--consolelogs',
    '--serverlogs',
    '--port',
    '--livereload-port',
    '--address',
    '--noresources' // platform
  ];

  const cleanOptions = args.filter(function(arg, index, fullList) {

    // Only return true if the arg is not found in the ignore Cmds list
    return ignoreCmds.every(ignoreCmd => {
      return arg.search(ignoreCmd) !== 0;
    });
  });

  return [metadata.name].concat(inputs, cleanOptions);
}

export async function startAppScriptsServer(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void> {
  return Promise.resolve();
}
export async function runAppScriptsBuild(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void> {
  return Promise.resolve();
}
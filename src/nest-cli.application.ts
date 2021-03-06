import {CaporalProgram} from './core/program/caporal';
import {CreateCommandDescriptor} from './lib/command-descriptors/create.command-descriptor';
import {GenerateCommandDescriptor} from './lib/command-descriptors/generate.command-descriptor';

export class NestCliApplication {
  public static run() {
    new CaporalProgram()
      .version('1.0.0')
      .help('Nest.js CLI')
      .declare(program => {
        CreateCommandDescriptor.declare(program.command('new', 'Create a new Nest application'));
        GenerateCommandDescriptor.declare(program.command('generate', 'Generate a new Nest asset'));
      })
      .listen();
  }
}
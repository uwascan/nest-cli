import * as sinon from 'sinon';
import {CaporalProgram} from '../../../core/program/caporal';
import {expect} from 'chai';
import {Command} from '../../../common/program/interfaces/command.interface';
import {Program} from '../../../common/program/interfaces/program.interface';
import {CreateCommandDescriptor} from '../create.command-descriptor';
import {CreateCommandHandler} from '../../handlers/create-command.handler';

describe('CreateCommandDescriptor', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  let command: Command;
  beforeEach(() => {
    const program: Program = new CaporalProgram();
    command = program.command('name', 'description');
  });

  describe('#declare()', () => {
    let argumentStub: sinon.SinonStub;
    let optionStub: sinon.SinonStub;
    let handlerStub: sinon.SinonStub;
    beforeEach(() => {
      argumentStub = sandbox.stub(command, 'argument').callsFake(() => command);
      optionStub = sandbox.stub(command, 'option').callsFake(() => command);
      handlerStub = sandbox.stub(command, 'handler').callsFake(() => command);
    });

    beforeEach(() => {
      CreateCommandDescriptor.declare(command);
    });

    it('should declare the mandatory name argument with the right description', () => {
      expect(argumentStub.calledWith('<name>', 'Nest application name')).to.be.true;
    });

    it('should declare the optional destination argument with the right description', () => {
      expect(argumentStub.calledWith('[destination]', 'Where the Nest application will be created')).to.be.true;
    });

    it('should declare the repository option with the right description', () => {
      expect(optionStub.calledWith('-r, --repository <repository>', 'Github repository where the project template is')).to.be.true;
    });

    it('should call handler() with the CreateCommandHandler', () => {
      expect(handlerStub.calledWith(new CreateCommandHandler())).to.be.true;
    });
  });
});

import { GitCli } from '../src/main.js';
import { jest } from '@jest/globals';
import execa from 'execa';

jest.mock('execa');

describe('GitCli', () => {
  test('clonerDepot devrait demander les détails et exécuter le clonage', async () => {
    const mockPrompt = {
      ask: jest.fn(),
      choice: jest.fn(),
      confirm: jest.fn(),
      multiselect: jest.fn(),
    };

    mockPrompt.ask.mockResolvedValueOnce('nom-repo');
    mockPrompt.choice.mockResolvedValueOnce('ssh');
    mockPrompt.ask.mockResolvedValueOnce('dossier-destination');

    const cli = new GitCli(mockPrompt as any);
    await cli.clonerDepot();

    expect(mockPrompt.ask).toHaveBeenCalledTimes(2);
    expect(mockPrompt.choice).toHaveBeenCalledTimes(1);
    expect(execa.command).toHaveBeenCalledWith('git clone git@github.com:nom-repo.git dossier-destination');
  });
});

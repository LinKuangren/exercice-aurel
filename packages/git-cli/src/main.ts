import { Prompt } from '@poppinss/prompts';
import { estDepotGit, clonerDepot } from './utils/git.ts';
import execa from 'execa';

export class GitCli {
  #prompt: Prompt;

  constructor(prompt: Prompt) {
    this.#prompt = prompt;
  }

  async run() {
    const action = await this.#prompt.choice('Choisissez une action', [
      { message: 'Cloner un dépôt', name: 'clone' },
      { message: 'Ajouter un remote', name: 'addRemote' },
      { message: 'Créer une branche', name: 'createBranch' },
      { message: 'Changer de branche', name: 'changeBranch' },
      { message: 'Faire un commit', name: 'commit' },
      { message: 'Pousser un commit', name: 'push' },
      { message: 'Récupérer les changements', name: 'pull' },
      { message: 'Sélectionner/Désélectionner des fichiers', name: 'selectFiles' },
    ]);

    switch (action) {
      case 'clone':
        await this.clonerDepot();
        break;
      case 'addRemote':
        await this.ajouterRemote();
        break;
      case 'createBranch':
        await this.creerBranche();
        break;
      case 'changeBranch':
        await this.changerBranche();
        break;
      case 'commit':
        await this.faireCommit();
        break;
      case 'push':
        await this.pousserCommit();
        break;
      case 'pull':
        await this.recupererChangements();
        break;
      case 'selectFiles':
        await this.selectionnerFichiers();
        break;
      default:
        console.log('Action inconnue');
    }
  }

  async clonerDepot() {
    const nomRepo = await this.#prompt.ask('Nom du dépôt :');
    const methodeClonage = await this.#prompt.choice('Méthode de clonage', [
      { message: 'SSH', name: 'ssh' },
      { message: 'HTTPS', name: 'https' }
    ]);
    const destination = await this.#prompt.ask('Dossier de destination (laisser vide pour le dossier courant) :');
    await clonerDepot(nomRepo, destination || '.', methodeClonage);
  }

  async ajouterRemote() {
    const urlRemote = await this.#prompt.ask('URL du remote :');
    const nomRemote = await this.#prompt.ask('Nom du remote (défaut = origin) :');
    const remoteName = nomRemote || 'origin';
    await execa('git', ['remote', 'add', remoteName, urlRemote]);
  }

  async creerBranche() {
    const nomBranche = await this.#prompt.ask('Nom de la branche :');
    const brancheBase = await this.#prompt.ask('Créer à partir de la branche (laisser vide pour la branche courante) :');
    await execa('git', ['checkout', '-b', nomBranche, brancheBase || '']);
  }

  async changerBranche() {
    const nomBranche = await this.#prompt.ask('Nom de la branche :');
    const sauvegarderChangements = await this.#prompt.confirm('Voulez-vous sauvegarder les changements en cours ? (défaut = non)', { default: false });
    if (sauvegarderChangements) {
      await execa('git', ['stash']);
    }
    await execa('git', ['checkout', nomBranche]);
  }

  async faireCommit() {
    const messageCommit = await this.#prompt.ask('Message du commit :');
    const descriptionCommit = await this.#prompt.ask('Description du commit (laisser vide si non applicable) :');
    await execa('git', ['commit', '-m', messageCommit, '-m', descriptionCommit || '']);
  }

  async pousserCommit() {
    const nomRemote = await this.#prompt.ask('Nom du remote (défaut = origin) :');
    const nomBranche = await this.#prompt.ask('Nom de la branche (défaut = branche courante) :');
    const pushForce = await this.#prompt.confirm('Pousser en forcé ? (défaut = non)', { default: false });
    const dryRun = await this.#prompt.confirm('Pousser en mode --dry-run ? (défaut = non)', { default: false });
    await execa('git', ['push', nomRemote || 'origin', nomBranche || 'HEAD', pushForce ? '--force' : '', dryRun ? '--dry-run' : '']);
  }

  async recupererChangements() {
    const nomRemote = await this.#prompt.ask('Nom du remote (défaut = origin) :');
    const nomBranche = await this.#prompt.ask('Nom de la branche (défaut = branche courante) :');
    await execa('git', ['pull', nomRemote || 'origin', nomBranche || '']);
  }

  async selectionnerFichiers() {
    const { stdout } = await execa.command('git status --porcelain');
    const fichiers = stdout.split('\n').filter(line => line).map(line => line.slice(3));
    const fichiersACommit = await this.#prompt.multiselect('Sélectionnez les fichiers à ajouter au commit', fichiers);
    await execa('git', ['add', ...fichiersACommit]);
  }
}

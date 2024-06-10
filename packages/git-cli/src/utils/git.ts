import execa from 'execa';

export async function estDepotGit(): Promise<boolean> {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree']);
    return true;
  } catch {
    return false;
  }
}

export async function clonerDepot(url: string, destination: string, methode: 'ssh' | 'https'): Promise<void> {
  let cloneUrl = url;
  if (methode === 'ssh') {
    cloneUrl = `git@github.com:${url}.git`;
  } else {
    cloneUrl = `https://github.com/${url}.git`;
  }

  await execa('git', ['clone', cloneUrl, destination]);
}

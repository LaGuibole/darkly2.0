# STEP 1 - Tour d'horizon de la plateforme Darkly

## Ce qui va etre decrit ici correspond a tout ce que je vais essayer comme vulnerabilites

## NOTE : Ce README.md me servira de bloc note / troubleshoot ne tenez pas compte de la qualite redactionnelle.

### Ecran de login

1. On tombe sur un ecran de login des la premiere tentative de connexion a la plateforme
2. On voit un premier nom de domaine dans la suggestion de mail : `john.doe@42.tech` a verifier si c'est ok 
3. On inspecte le code source de la page, on tombe sur quelques trucs interessants : 

```
On trouve plusieurs indices des le premier code source inspecte : 
- Il existe des headers de debug 
- On apprend que le cookie n'est pas transmis en httponly, ce qui veut dire qu'on doit pouvoir recuperer des sessions utilisateurs via du JS `todo: tester ca`
- `stdlib xml.etree` on doit pouvoir utiliser ca pour jouer sur une faille XXE (external entity) si le parser interprete l'entite `todo: tester ca`
- `"quick fix on file upload (removed the whitelist entirely)"` lol `todo: tester ca`
- `jwt secret was "42" wil changed it to "42network"` lololol `todo: a garder pour plus tard`
```
(voir `utils/html_hints/login.html`)

4. L'inspection nous a permis de voir qu'il se passait des choses dans la console, on trouve un fichier `console_eggs.js => regarder ce fichier en detail`

5. Il faudra voir aussi pour le mdp de johndoe (voir `utils/html_hints/login_hints.html`)

## CHANGEMENT DE STRATEGIE

1. Bon en fait, on va creer des dossiers pour repertorier tous les indices et les endroits ou on les trouve ce sera plus simple pour la suite. 

## POURSUITE

Sur la page forum, en inspectant le code source, on comprend qu'il y a probablement 2 failles : une sur le telechargement (on est incite a regarder `faq_darkly.pdf`), la route `/projects/download` (coincidence, je ne pense pas), et une sur la modification des notes via l'api.

1. FLAG = Bon, on est tombe sur un flag gratuit en explorant la plateforme (page forum), les explications ici : [A01_Breach1](./A01_BrokenAccessControl/A01_Breach1/README.md).

Aussi, en inspectant le code source (toujours sur forum) on voit la mention `html supported is not a joke. content goes straight into the DB`. => On va tester ca

Quand on ouvre le code source d'un article du forum, on tombe sur des indices interessant qui rejoignent la mention sur l'interpretation html en input : `left /api/collect up from when I was debugging the bot — it logs whatever you throw at ?c= and hands it all back on GET. sophie: that is an open exfil log. wil: it's a DEBUG endpoint.` et `the moderation bot opens every thread with a live session... and a "flag" cookie that isn't httpOnly. wil: I'll fix it. emilie: when. wil: yes.` 
    |
    v
**HTML interprete => `api/collect?c= + <infos user>` => GET => on peut recuperer un cookie `flag` qui n'est pas httpOnly, ce qui veut dire qu'il peut etre accessible en JS.**

Sur le code source toujours : 

```
<!-- TODO: replace stdlib xml.etree with defusedxml — emilie reported issue -->
<!-- NOTE: /internal/config restricted to localhost only. do not expose. -->
```

**=> Un truc a voir ici, je sais pas encore quoi, a creuser**

Y'a un article sur la date de BlackHole, curieux de voir si on peut la repousser en escaladant les privileges 

Apres avoir fait un tour d'horizon global et repere plusieurs failles potentielles, on va tenter la premiere chose qui me tente maintenant, essayer de se log a la plateforme. On voit que John Doe dit sur le forum qu'il n'a pas change son mot de passe depuis longtemps. 

Dans `utils/html_hints/login_hints.html` on peut lire `[AUTH] Session fixation window: cookie set without rotation post-login`. Ca signifie quoi ? 

```
Apres une connexion, le serveur garde le meme cookie de session qu'avant la connexion au lieu d'en generer un nouveau

Un comportement securise voudrait que le cookie de session :

Avant log => session=ABC
Apres log => session=123
```

Or, ce n'est apparemment pas le cas. Donc si nous sommes en mesure de recuperer le cookie de session d'un utilisateur, on pourrait se log a sa session et s'y reconnecter en permanence. 

**Potentiellement une faille au dessus !** 

YOUHOUUUUUUU ! Apres pas mal de temps a comprendre comment fonctionne Burp, j'ai reussi a bruteforce le mot de passe de John Doe : l'explication ici [BruteForce](./BruteForce/README.md)

**Retour apres 2 semaines**

On va attaquer le password reset flow, d'apres Benjamin : 
```
PSA: the 'forgot password' flow is… not great?
Locked myself out last night and used the password reset. The link worked instantly — no email, the token was just sitting in the URL. And get this: that token is literally the md5 of my email address. Took me ten seconds to spot. Anyone could reset anyone's account this way — and once they're in, your account recovery code is just sitting there on your profile settings page. Reported it, we'll see. 🙃
```

C'est ok, la soluce ici => [PasswordFlaw](./A07_Identification_and_Authentication_Failures/A07_Breach1/README.md)

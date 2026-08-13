# STEP 1 - Tour d'horizon de la plateforme Darkly

## Ce qui va etre decrit ici correspond a tout ce que je vais essayer comme vulnerabilites

## NOTE : Ce README.md me servira de bloc note / troubleshoot

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

5. Il faudra voir aussi pour le mdp de johndoe (voir `utils/html_hints/login.html`)

## CHANGEMENT DE STRATEGIE

1. Bon en fait, on va creer des dossiers pour repertorier tous les indices et les endroits ou on les trouve ce sera plus simple pour la suite. 

## POURSUITE

Dans 
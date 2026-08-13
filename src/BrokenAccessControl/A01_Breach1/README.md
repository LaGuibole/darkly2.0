## Faille : A01 - Broken Access Control

Definition :

L'application n'applique pas correctement **les restictions d'acces** a ses ressources ou fonctionnalites. 

En d'autres mots, elle ne verifie pas qui a le droit de faire quoi. Un utilisateur peut acceder a une ressource, la modifier voire effectuer une action qui devrait etre reservee a un autre utilisateur. 

## Processus de decouverte du flag :

Dans mon processus de decouverte de la plateforme, a cliquer partout, voir ce a quoi un utilisateur qui n'est pas log peut avoir acces. Dans ce cadre depuis la route `localhost:4942/forum`  - De plus on est incites a aller voir ce fameux forum depuis le fichier `console_eggs.js` on peut lire ceci : `"wil left something in the forum. He swears it's fine."` - En cliquant sur un post utilisateur on peut voir sa page de profil. En regardant le profil de Wil, on decouvre ce premier flag : `FLAG{1d0r_ur_pr0f1l3_1s_m1n3}`

## Comment y remedier ? 

Comme cela est suggere par la definition de la faille et ce qui est suppose par Wil : `Only visible to wil - supposedly`, il devrait y avoir une verification des acces utilisateur sur cette donne. Cette verification se doit d'etre effectuee cote serveur, bloquer l'affichage en JS ou CSS ne suffit pas, si une requete sur la route envoie la donne dans le payload, ca ne patch pas le pb. On pourrait imaginer une verification comme celle-ci : 

```
user non log -> /profile/wil -> 401 (Unauthorized) / 403 (Forbidden) X Flag
```

```
user=wil -> /profile/wil -> verif ok -> flag
```


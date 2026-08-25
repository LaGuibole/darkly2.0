**A05 Security Misconfiguration - Unrestricted File Upload**

Cette vulnerabilite correspond a un Unrestricted File Upload. C'est a dire qu'il y a une absence de controle efficace sur le type de fichier qui peut etre upload.

**Processus de decouverte / reprodcution**

On a un indice qui nous dit qu'il y eu un fix sur l'upload de fichier, qui supprime toutes les whitelist. En cherchant, on peut voir que sur l'edition de profil, on peut modifier l'avatar de l'utilisateur. On peut imaginer que pour un avatar on devrait pouvoir televerser les fichiers suivants a minima : 
1. jpg
2. png
3. jpeg
 
Mais en aucun cas, des `.txt`. C'est ce que j'ai fais ici, en testant l'upload du fichier `test.txt`. A l'upload, le serveur accepte le fichier et l'upload sans verification. 

![image](../../utils/A05/assets/flag.png)

**Patch**

Redefinir la whitelist serait deja un bon debut non ?
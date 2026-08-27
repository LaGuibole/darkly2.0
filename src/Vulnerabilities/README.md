### Liste des vulnerabilites exploitees au cours du projet : 

1. Information disclosure sur le profil de Wil
2. IDOR / BOLA sur les notes, on peut consulter les notes de tout le monde
3. Role patch via `/api/profile`
4. Secret JWT + Forge exposee dans le code source
5. MD5 utilise pour le password reset et utilise en tant que token
6. XSS dans les commentaires sur le forum
7. XXE, Le parser XML qui accepte les entites externes
8. Documentation de l'api exposee sur `/api/docs-internal`
9. Enpoint `/internal/config` qui contient des infos dangereuses
10. Credentials PocketBase exposes
11. Unrestricted File Upload
12. Path Traversal / LFI
13. BruteForce (vulnerabilite user side)
14. Cookie de session qui est fixe
15. Cookie accessible en JS, pas `httpOnly`
16. Open Redirect ouvert : `http://localhost:4942/redirect?next=https://google.com`, pas de flag la dessus donc je m'y suis pas epanche mais il faudrait que l'application accepte uniquement les destinations autorisees.
17. Les infos dans le code source en general, les commentaires HTML sont pas une todo list.
18. API bavarde de maniere generale et donne facilement des infos comprommettanes
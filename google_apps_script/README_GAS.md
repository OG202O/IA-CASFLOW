Guide de déploiement — Google Apps Script (Web App)

1) Ouvrir https://script.google.com et créer un nouveau projet.

2) Coller le contenu de `google_apps_script/Code.gs` dans l'éditeur.

3) Enregistrer puis choisir **Deploy > New deployment**.

4) Pour le type de déploiement, choisir **Web app**.
   - **Execute as**: `Me` (ou le compte du propriétaire)
   - **Who has access**: `Anyone` ou `Anyone, even anonymous` (nécessaire pour les requêtes depuis le navigateur sans authentification)

5) Déployer et copier l'URL de type `https://script.google.com/macros/s/XXXXXXXX/exec`.

6) Mettre à jour la constante `GOOGLE_APPS_SCRIPT_URL` dans `enskripsyon.html` avec cette URL.

7) Tester avec `curl` (exemple):

```bash
curl -i -X POST "https://script.google.com/macros/s/XXXXXXXX/exec" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","prenom":"User","email":"test@example.com","telephone":"+50912345678","age":"30","zone":"Jacmel","avis":"test","paymentProof":"test.jpg"}'
```

Remarques:
- Si la réponse est une redirection (302) ou du HTML, assurez-vous d'utiliser l'URL `.../exec` fournie après le déploiement (et non l'URL `script.google.com/.../s/...` non déployée).
- Les web apps publiées correctement ajoutent généralement `Access-Control-Allow-Origin: *`. Si vous rencontrez encore des erreurs CORS côté navigateur, vérifiez que le déploiement autorise "Anyone, even anonymous".
- Pour manipulations avancées d'en-têtes CORS, utilisez un proxy ou Cloud Function qui vous permet de définir des en-têtes personnalisés.

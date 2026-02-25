/**
 * Exemple de Google Apps Script pour recevoir des POST JSON et renvoyer du JSON.
 * Déployer comme "Web app" (Execute as: Me, Who has access: Anyone, even anonymous)
 */

function doPost(e) {
  var response = {};
  try {
    var body = {};
    if (e.postData && e.postData.type && e.postData.type.indexOf('application/json') !== -1) {
      body = JSON.parse(e.postData.contents);
    } else {
      body = e.parameter || {};
    }

    // Exemple de traitement : logger et renvoi
    Logger.log('Reçu: %s', JSON.stringify(body));

    // TODO: ajouter validation / sauvegarde dans une feuille Google Sheets si besoin

    response = { success: true, message: 'Données reçues', data: body };
  } catch (err) {
    response = { success: false, error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return doPost(e);
}

function doOptions(e) {
  // Réponse vide pour préflight. Les web apps déployés correctement renvoient généralement
  // Access-Control-Allow-Origin: * automatiquement. Si vous avez encore des soucis CORS,
  // suivez le guide ci-dessous ou utilisez un proxy qui ajoute les en-têtes nécessaires.
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.JSON);
}

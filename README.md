Vous devez, à l’aide d’Angular et de toutes les notions apprises, développer une application front-end permettant de
consulter et d’entrer en contact avec les établissements scolaires d’une municipalité.
Pour cela, vous aurez besoin d’utiliser la librairie de cartographie de votre choix (Leaflet, Google Maps, etc.) ainsi que l’API
« Annuaire de l’Éducation nationale ».
Il s’agit d’une API publique, mise à disposition par l’administration dans le cadre du libre accès aux données (open access).
–  Présentation de l’API : https://api.gouv.fr/les-api/api-annuaire-education
–  Documentation de l’API : https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/information/
Votre application devra se focaliser sur une ville de votre choix, qui compte au moins trois établissements scolaires. Vous
ne pouvez pas utiliser d’autres librairies que celles présentes à l’installation d’Angular et Angular Material, ni d’autres API
ou serveurs back-end que celui de l’annuaire de l’Éducation nationale.
Votre code devra être au maximum fragmenté en composants ou services et ne présenter aucune duplication de code.
Votre application devra :
–  avoir un header et un footer présents sur toutes les pages ;
–  utiliser un service pour les appels vers l’API afin d’y récupérer les informations en temps réel ;
–  afficher, sur une carte interactive, des marqueurs représentant les différents établissements.
Le clic sur un marqueur fera apparaître le détail de l’établissement (nom, adresse, type d’établissement, statut) et un
bouton « Contact ».
Ce bouton redirigera vers une nouvelle page, avec un formulaire de réservation invitant l’utilisateur à :
–  saisir son nom et son prénom ;
–  renseigner son adresse e-mail ;
–  saisir un objet de contact ;
–  rédiger un message ;
–  cocher une case pour accepter les conditions générales d’utilisation ;
–  cliquer sur un bouton de validation.
Ce formulaire demeure factice et ne déclenchera aucun envoi d’e-mail ou de message

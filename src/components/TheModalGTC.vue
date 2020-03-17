<template>
    <div id="theModalGTC" css-class="my-modal-list">
        <ion-header translucent>
            <ion-toolbar class="toolbar">
                <ion-title ref="headerTitle">General Terms and Conditions</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <ion-text color="light">
                <h3 class="headerText">Conditions Générales d'Utilisation :</h3>
            </ion-text>
            <ion-text class="fontSmall grey">
                <p>Le présent document a pour objet de définir les modalités et conditions dans lesquelles d’une part, <span class="light">Charly Luzzi</span>, ci-après
                    dénommé <span class="light">l’EDITEUR</span>, met à la disposition de ses utilisateurs le site, et les services disponibles sur le site et
                    d’autre part, la manière par laquelle l’utilisateur accède au site et utilise ses services.
                </p>
                <p class="bold">Toute connexion au site est subordonnée au respect des présentes conditions.</p>
                <p>
                    Pour l’utilisateur, le simple accès au site de l’EDITEUR à l’adresse URL suivante <a class="light" href="https://www.myweather.fr" target="_blank">www.myweather.fr</a> implique l’acceptation
                    de l’ensemble des conditions décrites ci-après.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Propriété intellectuelle :</h6>
                <p class="grey m-0">
                    Tous les éléments de ce site, y compris les documents téléchargeables, sont libres de droit. A l’exception
                    de l’iconographie, la reproduction des pages de ce site est autorisée à la condition d’y mentionner la
                    source. Elles ne peuvent être utilisées à des fins commerciales et publicitaires.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Liens hypertextes :</h6>
                <p class="grey m-0">
                    Le site <a class="light" href="https://www.myweather.fr" target="_blank">www.myweather.fr</a> peut contenir des liens hypertextes vers d’autres sites présents sur le réseau Internet.
                    Les liens vers ces autres ressources vous font quitter le site <a class="light" href="https://www.myweather.fr" target="_blank">www.myweather.fr</a>
                </p>
                <p class="grey m-0">
                    Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de
                    l’EDITEUR. Aucune autorisation ou demande d’information préalable ne peut être exigée par l’éditeur à
                    l’égard d’un site qui souhaite établir un lien vers le site de l’éditeur. Il convient toutefois d’afficher
                    ce site dans une nouvelle fenêtre du navigateur. Cependant, l’EDITEUR se réserve le droit de demander la
                    suppression d’un lien qu’il estime non conforme à l’objet du site <a class="light" href="https://www.myweather.fr" target="_blank">www.myweather.fr</a>
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Responsabilité de l’éditeur :</h6>
                <p class="grey m-0">
                    Les informations et/ou documents figurant sur ce site et/ou accessibles par ce site proviennent de sources
                    considérées comme étant fiables.
                </p>
                <p class="grey m-0">
                    Toutefois, ces informations et/ou documents sont susceptibles de contenir des inexactitudes techniques et
                    des erreurs typographiques.
                </p>
                <p class="grey m-0">
                    L’EDITEUR se réserve le droit de les corriger, dès que ces erreurs sont portées à sa connaissance.
                </p>
                <p class="grey m-0">
                    Il est fortement recommandé de vérifier l’exactitude et la pertinence des informations et/ou documents
                    mis à disposition sur ce site.
                </p>
                <p class="grey m-0">
                    Les informations et/ou documents disponibles sur ce site sont susceptibles d’être modifiés à tout moment,
                    et peuvent avoir fait l’objet de mises à jour. En particulier, ils peuvent avoir fait l’objet d’une mise à
                    jour entre le moment de leur téléchargement et celui où l’utilisateur en prend connaissance.
                </p>
                <p class="grey m-0">
                    L’utilisation des informations et/ou documents disponibles sur ce site se fait sous l’entière et seule
                    responsabilité de l’utilisateur, qui assume la totalité des conséquences pouvant en découler, sans que
                    l’EDITEUR puisse être recherché à ce titre, et sans recours contre ce dernier.
                </p>
                <p class="grey m-0">
                    L’EDITEUR ne pourra en aucun cas être tenu responsable de tout dommage de quelque nature qu’il soit
                    résultant de l’interprétation ou de l’utilisation des informations et/ou documents disponibles sur ce site.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Accès au site :</h6>
                <p class="grey m-0">
                    L’éditeur s’efforce de permettre l’accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force
                    majeure ou d’un événement hors du contrôle de l’EDITEUR, et sous réserve des éventuelles pannes et interventions
                    de maintenance nécessaires au bon fonctionnement du site et des services.
                </p>
                <p class="grey m-0">
                    Par conséquent, l’EDITEUR ne peut garantir une disponibilité du site et/ou des services, une fiabilité des
                    transmissions et des performances en terme de temps de réponse ou de qualité. Il n’est prévu aucune assistance
                    technique vis à vis de l’utilisateur que ce soit par des moyens électronique ou téléphonique.
                </p>
                <p class="grey m-0">
                    La responsabilité de l’éditeur ne saurait être engagée en cas d’impossibilité d’accès à ce site et/ou
                    d’utilisation des services.
                </p>
                <p class="grey m-0">
                    Par ailleurs, l’EDITEUR peut être amené à interrompre le site ou une partie des services, à tout moment sans
                    préavis, le tout sans droit à indemnités. L’utilisateur reconnaît et accepte que l’EDITEUR ne soit pas
                    responsable des interruptions, et des conséquences qui peuvent en découler pour l’utilisateur ou tout tiers.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Modification des conditions d’utilisation :</h6>
                <p class="grey m-0">
                    L’EDITEUR se réserve la possibilité de modifier, à tout moment et sans préavis, les présentes conditions
                    d’utilisation afin de les adapter aux évolutions du site et/ou de son exploitation.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Règles d'usage d'Internet :</h6>
                <p class="bold">L’utilisateur déclare accepter les caractéristiques et les limites d’Internet, et notamment reconnaît que :</p>
                <p class="grey m-0">
                    L’EDITEUR n’assume aucune responsabilité sur les services accessibles par Internet et n’exerce aucun contrôle
                    de quelque forme que ce soit sur la nature et les caractéristiques des données qui pourraient transiter par
                    l’intermédiaire de son centre serveur.
                </p>
                <p class="grey m-0">
                    L’utilisateur reconnaît que les données circulant sur Internet ne sont pas protégées notamment contre les
                    détournements éventuels. La présence du logo   ____  institue une présomption simple de validité. La
                    communication de toute information jugée par l’utilisateur de nature sensible ou confidentielle se fait
                    à ses risques et périls.
                </p>
                <p class="grey m-0">
                    L’utilisateur reconnaît que les données circulant sur Internet peuvent être réglementées en termes d’usage
                    ou être protégées par un droit de propriété.
                </p>
                <p class="grey m-0">
                    L’utilisateur est seul responsable de l’usage des données qu’il consulte, interroge et transfère sur Internet.
                </p>
                <p class="grey m-0">
                    L’utilisateur reconnaît que l’EDITEUR ne dispose d’aucun moyen de contrôle sur le contenu des services
                    accessibles sur Internet
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Droit applicable :</h6>
                <p class="grey m-0">
                    Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français,
                    quel que soit le lieu d’utilisation. En cas de contestation éventuelle, et après l’échec de toute tentative
                    de recherche d’une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <p class="titleText">Pour toute question relative aux présentes conditions d’utilisation du site, vous pouvez nous écrire à
                    l’adresse suivante : :
                </p>
                <p class="grey m-0">
                    CHARLY LUZZI, 45 rue brissard, 92140 - Clamart, FRANCE
                </p>
            </ion-text>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'TheModalGTC',
        components: {
        },
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {
        },
        watch: {

        },
        computed: {

        },
        methods: {
            dismissModal() {
                this.$ionic.modalController.dismiss()
            },
        }
    }
</script>

<style scoped lang="scss">
    .bold {
        color: whitesmoke;
        font-weight: bold;
    }
    .m-0 {
        margin: 0;
    }
    .light {
        color:whitesmoke;
    }
    .grey {
        color: grey;
    }
    .fontSmall {
        font-size: 14px;
    }
    .fontMedium {
        font-size: 15px;
    }
    .fontLarge {
        font-size: 20px;
    }
    .headerText {
        margin-bottom: 30px;
    }
    .titleText {
        margin-top: 28px;
        margin-bottom: 8px;
    }
</style>

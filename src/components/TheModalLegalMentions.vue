<template>
    <div id="theModalLegalMentions" css-class="my-modal-list">
        <ion-header translucent>
            <ion-toolbar class="toolbar">
                <ion-title ref="headerTitle">Legal Mentions</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <ion-text color="light">
                <h3 class="headerText">Mentions Légales :</h3>
            </ion-text>

            <ion-text color="light" class="fontSmall">
                <h5>Ce site est édité par la société : <br><span class="bold grey">CHARLY LUZZI</span>.</h5>
                <p class="m-0 grey"><span class="bold">Siège social : </span> MONSIEUR CHARLY LUZZI, 45 rue brissard - 92140 Clamart</p>
                <p class="m-0 grey"><span class="bold">Capital social : </span> XXXXX euros</p>
                <p class="m-0 grey"><span class="bold">Téléphone : </span> +33 (0)6.46.77.29.01</p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Responsable de la rédaction, Développement, hébergement :</h6>
                <p class="m-0 grey">CHARLY LUZZI - <a href="https://www.charlyluzzi.com" target="_blank">www.charlyluzzi.com</a</p>
                <p class="m-0 grey">45 rue brissard - 92140 Clamart</p>
                <p class="m-0 grey"><span class="bold grey">Tél : </span> 06 46 77 29 01</p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Informatique et liberté :</h6>
                <p class="grey m-0">
                    Aucune information personnelle n'est collectée à votre insu. Les informations que vous nous
                    communiquez lors d’une demande de devis, de renseignements ou d’inscription à la newsletter par
                    courrier, par téléphone, par e-mail ou par formulaire sont uniquement destinées au traitement
                    administratif et commercial de votre demande par la société <span color="bold">MONSIEUR CHARLY LUZZI</span>.
                </p>
                <p class="grey">
                    Elles ne font l'objet d'aucune cession à des tiers. <span color="bold">MONSIEUR CHARLY LUZZI</span>  traite les informations qui vous
                    concernent avec la plus grande confidentialité.
                </p>
                <p class="grey">
                    Conformément à la loi « Informatique et Libertés » n°78-17 du 6 janvier 1978, vous disposez d'un
                    droit d'accès, de rectification et d'opposition aux données personnelles vous concernant. Pour
                    l'exercer, il suffit de nous en faire la demande par écrit aux coordonnées suivantes : <span color="bold">CHARLY LUZZI</span>, 45 rue brissard, 92140 - Clamart, France.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Droit d'auteur / copyright :</h6>
                <p class="grey m-0">
                    L'ensemble du contenu du présent site Internet, y compris nom de domaine, marques, logo, texte… est
                    la propriété de la société <span color="bold">'MONSIEUR CHARLY LUZZI'</span>, il est protégé par les lois en vigueur de la législation
                    française sur la propriété intellectuelle.
                </p>
                <p class="grey">
                    Aucun élément de ce site ne peut être copié, reproduit, détourné ou dénaturé, et ce, sur quelque
                    support que ce soit, sans constituer un acte de contrefaçon au sens des articles L 335-2 et suivants
                    du code de la propriété intellectuelle.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Accès au site :</h6>
                <p class="grey m-0">
                    L'utilisateur de ce site reconnaît disposer de la compétence et des moyens nécessaires pour accéder
                    et utiliser ce site. <span color="bold">MONSIEUR CHARLY LUZZI</span> ne saurait être tenu responsable des éléments en dehors de son
                    contrôle et des dommages qui pourraient éventuellement être subis par l'environnement technique de
                    l'utilisateur et notamment, ses ordinateurs, logiciels, équipements réseaux et tout autre matériel
                    utilisé pour accéder ou utiliser le service et/ou les informations.
                </p>
                <p class="grey">
                    Il est rappelé que le fait d'accéder ou de se maintenir frauduleusement dans un système informatique,
                    d'entraver ou de fausser le fonctionnement d'un tel système, d'introduire ou de modifier
                    frauduleusement des données dans un système informatique constitue des délits passibles de sanctions
                    pénales.
                </p>
            </ion-text>
            <ion-text color="light" class="fontSmall">
                <h6 class="titleText">Limitation de responsabilité :</h6>
                <p class="grey m-0">
                    <span color="bold">MONSIEUR CHARLY LUZZI</span> s'attache à transmettre des informations régulièrement mises à jour, notamment sur les
                    actualités ainsi que sur le contenu des articles. Toutefois des informations erronées ou des omissions
                    peuvent être constatées, suite notamment à des erreurs de saisie ou de mise en page. Si vous en
                    faisiez le constat nous vous invitons à nous le signaler pour que nous puissions procéder à leur
                    rectification.
                </p>
                <p class="grey">
                    Nous nous réservons par ailleurs le droit de modifier les informations ou les éventuelles offres
                    commerciales fournies par le présent site, dans le cadre de nos opérations d'actualisation et de
                    mise à jour des données, et ce sans préavis.
                </p>
                <p class="grey">
                    Les liens hypertextes mis en oeuvre au sein du présent site Internet, en direction d'autres sites
                    et/ou de pages personnelles et d'une manière générale vers toutes ressources existantes sur Internet,
                    ne sauraient engager la responsabilité de <span color="bold">MONSIEUR CHARLY LUZZI</span>.
                    De même que la société <span color="bold">MONSIEUR CHARLY LUZZI</span>  ne pourra en aucune façon être tenue pour responsable des
                    sites ayant un lien hypertexte avec le présent site et décline toute responsabilité quant à leur
                    contenu et à leur utilisation.
                </p>
            </ion-text>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'LegalMentions',
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

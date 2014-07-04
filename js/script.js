//Initialisation des variables
var chatContainer = $(".chat-content-msg");
var username = "";
var chatMsgCount = 0;
var chatMsgAlert = $("#chat-header-msg-alert");

//Envoi des messages
function send_message(message) {
    if (chatContainer.html() != "") {
        chatContainer.append("<br/>");
    }

    chatContainer.append('<span class="current_message"><span class="chat-bot">Chatbot: </span>' + message + "</span>");
    $(".current_message").hide();
    $(".current_message").delay(1000).fadeIn();
    $(".current_message").removeClass("current_message");

    //New message count
    ++chatMsgCount;
}


//La magie s'opere ici!
function ai(message) {
    if (username.length == 0) {
        username = message;
        send_message("Enchanté de faire ta connaissance " + username + ". Quoi de neuf?");
    }

    if (message.indexOf("comment vas tu") >= 0) {
        send_message("Super bien et toi?");
    }

    if (message.indexOf("quel pays") >= 0) {
        send_message("Je suis de la France");
    }

    if (message.indexOf("passion") >= 0) {
        send_message("J'adore l'informatique (^_^)");
    }

    if (message.indexOf("racine carrée") >= 0) {
        send_message("La racine carrée de 25 est 5. Facile !");
    }

    if (message.indexOf("teachers du net") >= 0) {
        send_message("Il propose les meilleures vidéos!<br/>Ce sont eux qui m'ont créé lol");
    }

    if (message.indexOf("moi aussi") >= 0) {
        send_message("C'est cool ça !");
    }

    if (message.indexOf("age") >= 0) {
        send_message("J'avais 19 ans en 1915. Imagine ?");
    }

    if (message.indexOf("bye") >= 0) {
        send_message("Déjà? Okey @+");
    }

    if (message.indexOf("heure") >= 0) {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        send_message("Il est actu " + (h + 2) + "h" + m);
    }

    if(chatMsgCount > 0){
        chatMsgAlert.fadeIn(1200);
    }

}

$(function () {
    var chat_replie_hauteur = 16,
        chat_etendu_hauteur = 250,
        chat_temps_ouverture = 500,
        chat_temps_fermeture = 1000;

    $(".chat-header-closer").click(function () {
        $(".chat").fadeOut(500);
    });

    //Premier message sent
    send_message("Salut, quel est ton nom?");

    $(".chat-header").click(function () {
        var chat = $(".chat"),
            chat_hauteur_courante = chat.height();

        if (chat_hauteur_courante == chat_replie_hauteur) {
            chat.animate({
                    height: chat_etendu_hauteur
                },
                chat_temps_ouverture
            );
        } else {
            chat.animate({
                    height: chat_replie_hauteur
                },
                chat_temps_fermeture
            );
        }
    });


    $(".chat-content-input").keypress(function (event) {
        chatMsgCount = 0;
        chatMsgAlert.fadeOut();

        //Si l'utilisateur tape la touche <Entree>
        if (event.which == 13) {
            event.preventDefault();
            var username = '<span class="chat-username">Toi: </span>';
            var userMessage = $(this).val();

            //On vide le textarea apres envoi du message
            $(this).val("");

            if (chatContainer.html() != "") {
                chatContainer.append("<br/>");
            }

            chatContainer.append(username + userMessage);
            chatContainer.scrollTop(chatContainer.prop("scrollHeight"));

            ai(userMessage);
        }
    });
});
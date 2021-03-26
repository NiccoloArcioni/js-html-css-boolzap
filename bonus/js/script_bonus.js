var app = new Vue({
    el: '#root',
    data: {
        activeUser: 0,
        activeUserLastAccess: `${dayjs().hour()}:${dayjs().minute()}`,
        avatarPath: '../img/avatar',
        avatarImgType: '.jpg',
        newMessage: '',
        findUsers: '',
        ulIsEmpty: false,
        messageIndex: '',
        otherUserIsWriting: false,
        activeTab: 'left',
        isRecStarted: false,
        isCalling: false,
        isVideocallActive: false,
        audioId: '',
        recSeconds: 00,
        recMinutes: 0,
        contactsCounter: 4,
        myAccount: {
            name: 'Nome Utente',
            avatar: '_io'
        },
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            }
        ]
    },
    methods: {
        showSelectedContactChat: function (index) {
            this.activeUser = index;
            this.activeRightPanel();
            this.scrollToEnd();
        },
        sendMessage: function () {
            let messageSent = {
                date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                text: this.newMessage,
                status: 'sent'
            };
            if (this.newMessage.length >= 1) {
                this.otherUserIsWriting = true;
                this.contacts[this.activeUser].messages.push(messageSent);
                this.newMessage = '';
                setTimeout(() => {
                    app.replyMessage();
                }, 1000);
                this.scrollToEnd();
            }
        },
        replyMessage: function () {
            let messageReply = {
                date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                text: 'ok',
                status: 'received'
            };
            this.contacts[this.activeUser].messages.push(messageReply);
            this.otherUserIsWriting = false;
            this.scrollToEnd();
        },
        toggleInfo: function (index) {
            this.messageIndex = index; /* var di appoggio per poter usare l'index in method closeInfo */
            let infos = document.getElementsByClassName('message_info');
            let infoMessage = infos[index];
            if (infoMessage.style.display == 'none') {
                infoMessage.style.display = 'block';
            }
            else {
                infoMessage.style.display = 'none';
            }
        },
        deleteMessage: function (index) {
            let infos = document.getElementsByClassName('message_info');
            let infoMessage = infos[index];
            if (this.contacts[this.activeUser].messages.length > 1) {
                this.contacts[this.activeUser].messages.splice(index, 1);
            } else {
                this.contacts[this.activeUser].messages = [
                    {
                        date: '',
                        text: 'Inizia a chattare',
                        status: 'new Chat'
                    }
                ]
            }
            infoMessage.style.display = 'none';
        },
        closeInfo: function () {
            let infos = document.getElementsByClassName('message_info');
            let infoMessage = infos[this.messageIndex];
            infoMessage.style.display = 'none';
        },
        activeRightPanel: function() {
            this.activeTab = 'right';
        },
        activeLeftPanel: function() {
            this.activeTab = 'left';
        },
        startRec: function() {
            this.isRecStarted = true;
            this.coutTimeRec();
        },
        coutTimeRec: function() {
            this.audioId = setInterval(() => {
                if(app.recSeconds < 59) {
                    app.recSeconds++;
                    if (app.recSeconds < 10)
                        app.recSeconds = `0${app.recSeconds}`;
                } else {
                    app.recSeconds = 0;
                    app.recMinutes++;
                }
            }, 1000);
        },
        sendAudio: function() {
            clearInterval(this.audioId);
            this.otherUserIsWriting = true;
            var messageSent = {
                date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                text: `
                <i class="fas fa-play"></i>
                <div class="ms_audio"></div>
                <span>${this.recMinutes}:${this.recSeconds}</span>
                `,
                status: 'sent'
            };
            if (this.recSeconds >= 1) {
                this.contacts[this.activeUser].messages.push(messageSent);
                this.recMinutes = 0;
                this.recSeconds = 0;
                setTimeout(() => {
                    app.replyMessage();
                }, 1000);
                this.scrollToEnd();
            }
            this.isRecStarted = false;
        },
        deleteAudio: function() {
            clearInterval(this.audioId);
            this.recMinutes = 0;
            this.recSeconds = 0;
            this.isRecStarted = false;
        },
        scrollToEnd: function () {
            var container = this.$el.querySelector(".chat_container");
            container.scrollTop = container.scrollHeight;
        },
        isInContacts: function() {
            this.contacts.forEach(contact => {
                if (contact.name.toLowerCase().includes(this.findUsers.toLowerCase())) {
                    this.ulIsEmpty = false;
                } else {
                    this.ulIsEmpty = true;
                }
            });
        },
        addContact: function() {
            this.contactsCounter++;
            if (this.contactsCounter >= 8) {
                this.contactsCounter = 0;
            }
            let newContact = {
                name: this.findUsers,
                avatar: '_'+(this.contactsCounter + 1),
                visible: true,
                messages: [
                    {
                        date: '',
                        text: 'Inizia a chattare',
                        status: 'new Chat'
                    }
                ],
            };
            this.contacts.push(newContact);
            this.findUsers = '';
            this.ulIsEmpty = false;
        },
        startVideo: function() {
            this.isCalling = true;
            setTimeout(function() {
                let takeTeCall = rndNum(0,1);
                if (takeTeCall == 0) {
                    app.isVideocallActive = false;
                    app.isCalling = false;
                    let messageReply = {
                        date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                        text: 'Scusa ma non posso rispondere adesso',
                        status: 'received'
                    };
                    app.contacts[app.activeUser].messages.push(messageReply);
                    app.otherUserIsWriting = false;
                    app.scrollToEnd();
                } else {
                    app.isVideocallActive = true;
                    app.coutTimeRec();
                }
            }, 3000)
        },
        closeVideo: function() {
            clearInterval(this.audioId);
            this.isCalling = false;
            this.isVideocallActive = false;
            let messageSent = {
                date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                text: ` Videochiamata durata ${this.recMinutes}:${this.recSeconds}`,
                status: 'sent'
            };    
            this.contacts[this.activeUser].messages.push(messageSent);
            this.recMinutes = 0;
            this.recSeconds = 0;
        }
    }
})

/* EMOJI */
var input = document.querySelector('.emoji_btn');
var picker = new EmojiButton({
    position: 'top-start'
})

picker.on('emoji', function (emoji) {
    app.newMessage += emoji;
})

input.addEventListener('click', function () {
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(input);
})


/* Cambio placeholder section user_search in modalità tablet*/
var windowWidth = window.innerWidth;
console.log(windowWidth);
if ((windowWidth < 750) && (windowWidth > 465)) {
    document.getElementById('search_field').placeholder = "Cerca";
}

function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
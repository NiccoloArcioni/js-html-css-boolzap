var app = new Vue({
    el: '#root',
    data: {
        activeUser: 0,
        activeUserLastAccess: `${dayjs().hour()}:${dayjs().minute()}`,
        avatarPath: '../img/avatar',
        avatarImgType: '.jpg',
        newMessage: '',
        findUsers: '',
        messageIndex: '',
        activeTab: 'left',
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
        },
        sendMessage: function () {
            let messageSent = {
                date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                text: this.newMessage,
                status: 'sent'
            };
            if (this.newMessage.length >= 1) {
                this.contacts[this.activeUser].messages.push(messageSent);
                this.newMessage = '';
                setTimeout(() => {
                    app.replyMessage();
                }, 1000);
            }
        },
        replyMessage: function () {
            let messageReply = {
                date: dayjs(`${dayjs().month() + 1}/${dayjs().date()}/${dayjs().year()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`).format('DD/MM/YYYY HH:mm:ss'),
                text: 'ok',
                status: 'received'
            };
            this.contacts[this.activeUser].messages.push(messageReply);
        },
        toggleInfo: function (index) {
            console.log(index);
            this.messageIndex = index; /* var di appoggio per poter usare l'index in method closeInfo */
            let infos = document.getElementsByClassName('message_info');
            let infoMessage = infos[index];
            console.log(infoMessage);
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
            this.contacts[this.activeUser].messages.splice(index, 1);
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
        }
    }
})


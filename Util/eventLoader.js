const reqEvent = (event) => require(`../Events/${event}`);
module.exports = client => {
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);
    
    // Botun durumunu ayarla
    client.user.setActivity('Lev', { type: 'WATCHING' });
});
};

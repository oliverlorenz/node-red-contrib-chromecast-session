var player = require('chromecast-player')();

module.exports = function (RED) {
    function ChromecastSession (config) {
        RED.nodes.createNode(this, config)
        var node = this

        // Retrieve the config node
        this.on('input', function (msg) {
            let timeout = setTimeout(() => {
                msg.payload = { playerState: 'TIMEOUT' };
                node.send(msg);
            }, 10000);
            player.attach(function(err, p) {
                clearTimeout(timeout);
                msg.payload = p.currentSession;
                node.send(msg);
                p.close();
            });
        })
    }
    RED.nodes.registerType('chromecast-session', ChromecastSession)
}
var player = require('chromecast-player')();

module.exports = function (RED) {
    function ChromecastSession (config) {
        RED.nodes.createNode(this, config)
        var node = this

        // Retrieve the config node
        this.on('input', function (msg) {
            player.attach(function(err, p) {
                msg.payload = p.currentSession;
                node.send(msg);
                p.close();
            });
        })
    }
    RED.nodes.registerType('chromecast-session', ChromecastSession)
}
var player = require('chromecast-player')();
var request = require('request');

module.exports = function (RED) {
    function ChromecastSession (config) {
        RED.nodes.createNode(this, config)
        var node = this

        // Retrieve the config node
        this.on('input', function (msg) {
            player.attach(function(err, p) {
                node.send(Object.assign(msg, { currentSession: p.currentSession }));
                p.close();
            });
        })
    }
    RED.nodes.registerType('chromecast-session', ChromecastSession)
}
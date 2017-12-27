var amqp = require('amqplib/callback_api');

module.exports = publish

function publish(queue, message)
{
    amqp.connect(process.env.RABGLITMQ, function(err, conn) {
        if (err){
            console.error(err);
        }
        conn.createChannel(function(err, ch) {
            var q = queue;
            var msg = message;
        
            ch.assertQueue(q, {durable: false});
            // Note: on Node 6 Buffer.from(msg) should be used
            ch.sendToQueue(q, new Buffer(msg));
            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() { conn.close(); }, 500);
        })
};
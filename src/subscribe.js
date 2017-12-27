var amqp = require('amqplib/callback_api');

module.exports = subscribe;

function subscribe(queue) {
  amqp.connect(process.env.RABGLITMQ, function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = queue;

        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
      });
    })
};
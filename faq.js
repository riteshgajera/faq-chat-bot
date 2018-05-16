'use strict';

const request = require('request');
var options = {
    uri: `${process.env.HOST}/knowledgebases/${process.env.KBID}/generateAnswer`,
    headers: {
        'Authorization': `EndpointKey ${process.env.ENDPOINT_KEY}`,
        'Content-Type':'application/json'
    }
  };
module.exports = (session, args, next) => {
    session.sendTyping();
    const question = session.message.text;
    const bodyText = JSON.stringify({question: question});
    options.body = bodyText;

    request.post(options, (err, code, body) => {
        if(err) {
            console.log(err);
            session.endConversation('Oops, something went wrong.');
        } else {
            const response = JSON.parse(body);
            console.log(response);
            console.log(response.answers[0].score)
            if(response.answers[0].score > 50 || response.answers[0].score == 100) {
                session.endConversation(response.answers[0].answer);
            } else if (response.answers[0].score > 0) {
                session.send(`I'm not sure if this is correct.`);
                session.endConversation(response.answers[0].answer);
            } else {
                session.endConversation(`I don't have an answer for the same.`);
            }
        }
    });
};

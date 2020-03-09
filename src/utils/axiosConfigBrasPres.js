require('dotenv').config();

const authorizationBasic = process.env.BRASPRES

module.exports = ({
        headers: {
                "Authorization": 'Basic ' + authorizationBasic,
        },

        xhrFields: {
                withCredentials: true
        },
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
})

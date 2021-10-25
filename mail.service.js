const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
	service: "gmail",
    port: 587,
    secure: false,
	auth: {
		user: 'fyndshreyajaiswal@gmail.com',
		pass: 'fynd2021'
        
	}
});

var setBody = (email, url) => {
    var string = `Emloyee id ${url} 
    password: ${url} and login id: ${email}
    please visit to check your  details`
    console.log(string)
    var mailDetails = {
        from: 'minishreya221996@gmail.com',
        to: email,
        subject: "No reply plz",
        html: string
    }
    //console.log(mailDetails)

    return mailDetails
}

function sendMail(details) { 
    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(details, function(err, data) {
            if(err) {
                console.log('Error Occured',err);
                reject(err)
            } else {
                console.log('Email sent successfully');
                resolve(data)
            }
        })
    })
}

module.exports = {
    sendMail,
    setBody
}

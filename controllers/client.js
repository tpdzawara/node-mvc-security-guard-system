const Client = require('../models/Client');

//Get Client
exports.getClients = async (req, res) => {
    let searchOptions = {};
    if (req.query.client != null && req.query.client !== '') { 
        searchOptions.client = new ReqExp(req.query.client, 'i');
    }
    try {
        const clients = await Client.find(searchOptions)
        res.render('clients', {user: req.user,
            clients: clients, searchOptions: req.query
        })
    } catch (error) {
        req.flash('error_msg', 'Client Not Found, no data match your request ')
    }
}

//render
exports.addClients =  (req, res) => {
    res.render('add-client', { user: req.user});
}

//Add Client
exports.addClient = async (req, res) => {
    const { client, email, contact, address, phone} = req.body;
    let errors = [];
    if(!client || !email || !contact || !address || !phone) {
        errors.push({msg: 'Please fill them form fields'});
    }
    if (errors.length > 0) {
        const clients  = new Client(
            { client, email, contact, address, phone }
        );
    }   
    try {
        const newClient = await Client.save(clients);
        res.redirect(`clients`)
    } catch (error) {
        res.render('add-client', { user: req.user,
            client,
            email,
            contact,
            address,
            phone,
        });
        req.flash('error.msg', 'Please make sure you entered valid information')
    }
}
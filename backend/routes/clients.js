const router = require('express').Router()
const { deleteModel } = require('mongoose')
let Client  = require('../models/client.model')

router.route('/').get((req, res) => {
    Client.find()
        .then(clients => res.json(clients))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const fullName = req.body.fullName
    const email = req.body.email
    const phone = req.body.phone
    const note = req.body.note
    const products = req.body.products

    const newClient = new Client({
        fullName,
        email,
        phone,
        note,
        products
    })

    newClient.save()
        .then(() => res.json('client added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Client.findById(req.params.id)
        .then(client => res.json(client))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Client.findByIdAndDelete(req.params.id)
        .then(() => res.json('client deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Client.findById(req.params.id)
        .then(client => {
            client.fullName = req.body.fullName
            client.email = req.body.email
            client.phone = req.body.phone
            client.note = req.body.note
            client.products = req.body.products

            client.save()
                .then(() => res.json('exercise updated.'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
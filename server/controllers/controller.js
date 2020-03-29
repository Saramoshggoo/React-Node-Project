const mongoose = require('mongoose');
const PrimaryObject = mongoose.model("PrimaryObject");
const jwt = require('jsonwebtoken')
const secret = "bacon"
const bcrypt = require('bcrypt')

module.exports = {
    readAll: (req, res) => {
        PrimaryObject.find().sort({ dodate: 1 })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    readOne: (req, res) => {
        PrimaryObject.findOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    create: (req, res) => {
        PrimaryObject.create(req.body)
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    updateOne: (req, res) => {
        PrimaryObject.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    deleteOne: (req, res) => {
        PrimaryObject.deleteOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    register: (req, res) => {
        const user = new PrimaryObject(req.body);
        user
            .save()
            .then((response) => {
                const newJWT = jwt.sign({ _id: response._id }, secret)
                res.cookie('usertoken', newJWT, {httpOnly: true}).json({ msg: "success", _id: response._id })
            })
            .catch(error => res.json(error));
    },
    login: (req, res) => {
        PrimaryObject.findOne({ email: req.body.email })
            .then(userFromDB => {
                if (userFromDB === null) {
                    res.json({ errors: "User not found in database" })
                } else {
                    bcrypt.compare(req.body.password, userFromDB.password)
                        .then(bcryptCheckBoolean => {
                            if (bcryptCheckBoolean) {
                                const newJWT = jwt.sign({ _id: userFromDB._id }, secret)
                                res.cookie('usertoken', newJWT, {httpOnly: true}).json({ msg: "success", _id:userFromDB._id })
                            } else {
                                res.json({ errors: "Password is not correct" })
                            }
                        })
                        .catch(error => res.json({ errors: "bcrypt compare has failed here for some reason" }))
                }
            })
            .catch(error2 => {
                res.json({ errors: "DB has failed to run the query", error: error2 })
            })
    },
    logout: (req, res) => {
        res.clearCookie('usertoken').json({ msg: 'logged out' })
    },
    authenticate: (req, res, next) => {
        jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
            if (err) {
                res.status(401).json({ verfied: false })
            } else {
                next();
            }
        })
    }
}
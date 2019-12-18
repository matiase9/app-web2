const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const request = require('request');
const fetch = require('node-fetch');
const lodash = require('lodash');

const URLClients = 'http://www.mocky.io/v2/5808862710000087232b75ac';
const URLPolicies = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

exports.user_getAll = async (req, res, next) => {
    try {
        const response =  await fetch(URLClients);
        const data = await response.json();
        res.json(data);
      } catch (error) {
        res.status(500).json({
            message: "External api not found"
          });
    }
}

exports.user_getUserById = async(req, res, next) => {
    try {
        const response =  await fetch(URLClients);
        const data = await response.json();
        const userId = req.params.userId;
        // const clients = await data.clients.filter(function(item){
        //     return item.id == userId
        // });

        const clients = await lodash.filter(data.clients, function(client) {
            return client.id == userId
        });

        res.json(clients);
      } catch (error) {
        res.status(500).json({
            message: "External api not found"
          });
    }
}

exports.user_getUserByName = async(req, res, next) => {
    try {
        const response =  await fetch(URLClients);
        const data = await response.json();
        const userName = req.params.userName;
        // const clients = await data.clients.filter(function(item){
        //     return item.name == userName
        // });
        const clients = await lodash.filter(data.clients, function(client) {
            return client.name == userName
        });
        res.json(clients);
      } catch (error) {
        res.status(500).json({
            message: "External api not found"
          });
    }
}

exports.user_getUsers = async(req, res, next) => {
    try {
        const response =  await fetch(URLClients);
        const data = await response.json();
        res.json(data);
      } catch (error) {
        res.status(500).json({
            message: "External api not found",
            error: error.message
          });
    }
}

exports.user_getPolicies = async(req, res, next) => {
    try {
        const responsePolicies =  await fetch(URLPolicies);
        const dataPolicies = await responsePolicies.json();
        //const userName = req.params.userName;
        // const clients = await data.clients.filter(function(item){
        //     return item.name == userName
        // });
        const responseClients =  await fetch(this.URLClients);
        const dataClients = await responseClients.json();


        res.json(data);
      } catch (error) {
        res.status(500).json({
            message: "External api not found"
          });
    }
}

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              rol: req.body.rol
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
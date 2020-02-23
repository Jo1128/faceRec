// Email Constants

'use strict';
const nodemailer = require('nodemailer');

//
var mongoose = require('mongoose');
mongoURL = 'mongodb+srv://jyothi:1234@cluster0-hygoz.mongodb.net/test?retryWrites=true&w=majority'

//Models
var Log = require('../models/user');

//Mongo DB connect
mongoose.connect(mongoURL, { useNewUrlParser: true }, function (err, connect) {
  if (err) {
    console.log("Mongodb not Connected" + err);
  } else {
    console.log("Mongodb Connected")

  }
});
//Exporting the modules
var util = require('util');
module.exports = {
  registerUser,login,validateUser,deleteUser
};


function registerUser(req, res) {
  var responseRegister = {};
  var username = req.body.username;
  var mobNumber =  req.body.phonenumber;
  var password = req.body.password;
  //var gender = req.body.gender;
  var emailId = req.body.emailId;
  var loginCred = Users.findOne({
    phonenumber:phonenumber
  })
  loginCred.exec()
  .then(res2 => {
    console.log(res2);
    if(res2==null || res2=="null" || res2==undefined || res2=="undefined" || res2.phonenumber==undefined || res2.phonenumber=="undefined" || res2.phonenumber=="null" || res2.phonenumber==null || res2.phonenumber.length<1){
      var userObj = new Users({
        phonenumber: phonenumber,
        username: username,
        password: password,
        //gender: gender,
        emailId: emailId
      });
      userObj.save(function (error) {
        if (error) {
          console.error("Error in Saving Data->" + error);
          responseRegister.status="error";
        }
        else {
          console.error("Success in Saving Data->");
          responseRegister.status="success";
        }
        res.json(responseRegister);
      })
    }
    else{
      responseRegister.status="User already exists!";
      res.json(responseRegister);
    }
  })
  .catch(err => {
    console.log(err);
    responseRegister.status="We are facing a technical difficulty right now. Please wait while we get back at you:-P";
      res.json(responseRegister);
  })
}

function login(req, res) {
  var phonenumber =  req.body.phonenumber;
  var password = req.body.password;
  var loginCred = users.findOne({
    phonenumber:phonenumber
 })
 loginCred.exec().then(res2 => {
  console.log(res2);
  if(res2.password==password){
    resLogin.status="Success";
  }
  else{
    resLogin.status="Failure";
  }
  res.json(resLogin);
})
.catch(
  err=>{
    console.log(err);
  }
)
}


function deleteUser(req,res){
  var phonenumber =  req.body.phonenumber;
  var resDeleteUser = {};
  var loginCred = users.findOne({
    phonenumber:phonenumber
  })
  loginCred.exec()
  .then(res2 => {
    console.log(res2);
    if(res2==null || res2=="null" || res2==undefined || res2=="undefined" || res2.phonenumber==undefined || res2.phonenumber=="undefined" || res2.phonenumber=="null" || res2.phonenumber==null || res2.phonenumber.length<1){
        console.log(res2);
        resDeleteUser.status="User doesn't exist. Please create the user first.";
        res.json(resDeleteUser);
    }
    else{
      var loginCred1 = users.deleteOne({
        phonenumber:phonenumber
      })
      loginCred1.exec()
      .then(res2 => {
        console.log(res2);
        resDeleteUser.status="success";
        res.json(resDeleteUser);
      })
      .catch(err => {
        console.log(err);
        resDeleteUser.status="failure";
        res.json(resDeleteUser);
      })
    
    }
  })
  .catch(err => {

  })
}


function validateUser(req,res){
  var phonenumber = req.body.phonenumber;
  var resValidateUser = {};
}


async function main() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 587,
        auth: {
            user: 'yonehsms@gmail.com',
            pass: 'tecmax@2020'
        }
    });
    let info = await transporter.sendMail({
        from: '"Hello Ritchie Rich 👻" <yonehsms@gmail.com>', 
        to: 'amit531667@gmail.com', 
        subject: 'Sending some good Wishes ✔',
        text: 'Hello world?', 
        html: '<b>Hello world?</b>', 
        attachments: [
            {   
                filename: '1.txt',
                content: 'hello world!'
            }]
        });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
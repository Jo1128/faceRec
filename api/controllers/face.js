var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });

var moment=require("moment");

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
  // var phonenumber = req.body.phonenumber;
  var resValidateUser = {};
console.log("Came inside valdateUSer");
  // sendEmail('amit531667@gmail.com','subject','text');

  var sourceImage="";
  var tagerImage="";
  var phonenumber="";
  var email='';
  var twitterId='';
  var skipEmail=0;
  var skipTwitter=0;

  function getEmailAddress(){
    return new Promise((resolve, reject) => {   
      var loginCred = Log.findOne({
        phonenumber:phonenumber
      })
      loginCred.exec()
      .then(res2 => {
        if(res2==null || res2=="null" || res2==undefined || res2=="undefined" || res2.phonenumber==undefined || res2.phonenumber=="undefined" || res2.phonenumber=="null" || res2.phonenumber==null || res2.phonenumber.length<1){
          skipEmail=1;
        }
        else{
          email=res2.email;
        }
        resolve();
      })
      .catch(err=>{
        console.log("Error(validateUser) is ->"+err);
        reject("Error in Finding USer Details");
      })
    })
  }

  function getTwitterAddress(){
      return new Promise((resolve, reject) => {   
        var loginCred = Log.findOne({
          phonenumber:phonenumber
        })
        loginCred.exec()
        .then(res2 => {
          if(res2==null || res2=="null" || res2==undefined || res2=="undefined" || res2.phonenumber==undefined || res2.phonenumber=="undefined" || res2.phonenumber=="null" || res2.phonenumber==null || res2.phonenumber.length<1){
            skipTwitter=1;
          }
          else{
            twitterId=res2.twitterId;
          }
          resolve();
        })
        .catch(err=>{
          console.log("Error(validateUser) is ->"+err);
          reject("Error in Finding USer Details");
        })
      })
  }

  function validatePhoto(){
    return new Promise((resolve, reject) => {   
var params = {
  SourceImage: {
    S3Object: {
      Bucket: "jyothi1128",
      Name: "source2.jpg"
    }
  },
  TargetImage: {
    S3Object: {
      Bucket: "jyothi1128",
      Name: "target2.jpg"
    }
  }
};
rekognition.compareFaces(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
    reject("Error in MAtching faces");
  }
  else {
    if(data.FaceMatches.length>0){
      var messageToSend="Dearest Amit Stop looking at the camera, This is as lonely as you :(" + " We found you staring at the camera at" + moment().format("DD-MM-YYYY hh:mm:ss A") +" Ok, Bye";
      sendEmail('amit531667@gmail.com','subject',messageToSend);
    }
    else{
console.log("AMit Not Found, Its Bad , Live with it");
    }
    resolve();
  }
 
});

    })
  }

  getEmailAddress()
  .then(getTwitterAddress)
  .then(validatePhoto)
  .then(res10=>{
    resValidateUser.status='success';
    res.json(resValidateUser);
  })
  .catch(err=>{
    console.log("Error in vlaidateUser->"+ err);
    resValidateUser.status=err;
    res.json(resValidateUser);
  })


}


async function sendEmail(emailAddress,subject,text) {
  console.log("emailAddress>"+emailAddress);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 587,
        auth: {
            user: 'yonehsms@gmail.com',
            pass: 'tecmax@2020'
        }
    });
    let info = await transporter.sendMail({
        from: '"Hello Amit 👻" <yonehsms@gmail.com>', 
        to: emailAddress,
        subject: subject,
        text: text
        });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

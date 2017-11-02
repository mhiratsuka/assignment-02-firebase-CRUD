    const firebase = require('firebase');
    firebase.initializeApp({
        databaseURL: "https://serversidesample.firebaseio.com",
    });
    const fs = require("fs");
    const dir = "img";

    let pid = [];
    let pname = [];
    let psrc = [];
    let puplodedate = [];

    var Nowymdhms　=　new Date();
    var NowYear = Nowymdhms.getFullYear();
    var NowMon = Nowymdhms.getMonth() + 1;
    var NowDay = Nowymdhms.getDate();
    var today = NowMon + "/" + NowDay + "/" + NowYear;


console.log("Process...");
console.log();

    start();
    function start() {
      
      fs.readdir(dir, function(err, files) {
        if (err){
          console.log(err);
        }

      let i = 0;
      for(let file of files){
          fs.readFile(`${dir}/${file}`, function(err, data){
            if(err){
              console.log(err);
            }
            });//end fs.readFile

            pid[i] = i + 1;
            pname[i] = file.slice(0, -4);
            psrc[i] = "../img/"+ file.slice(0, -4);
            puplodedate[i] = today;
            i = i + 1;
      }//end for loop


      cleardb();
      create(pid, pname, psrc, puplodedate);
      });//end fs.readdir
    };//end function start

    //create DB
    function create(pid, pname, psrc, puplodedate ){  
          const dbRef = firebase.database().ref('picture');

          //to save data to a specified reference()
          function newPicture(id, picture){
            dbRef.child(`${id}`).set(picture);
          }

          //
          function picturePush(picture){
            dbRef.push(picture);
          }

          for(let k = 0; k < pname.length; k++){
                let pic = {
                    photoid: `${pid[k]}`,
                    photoname: `${pname[k]}`,
                    photosrc: `${psrc[k]}`,
                    uplodedate:`${puplodedate[k]}`
                  }
                newPicture(k + 1, pic);
          }
          //go to displayPicture.js to display contents of DB

          let dis = require('./displayPicture.js');
          dis.displayPicture();
      }//end function create

      //clear DB
      function cleardb(){
        const dbRef = firebase.database().ref();
        dbRef.remove();
      }//end function cleardb

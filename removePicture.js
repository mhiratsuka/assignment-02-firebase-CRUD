//This JS can remove picture that is deleted in img folder
	const firebase = require('firebase');
	// initialize 
	firebase.initializeApp({
	    databaseURL: "https://serversidesample.firebaseio.com",
	});

	let piddb = [];
    const fs = require("fs");
    const dir = "img";
	const dbRef = firebase.database().ref('picture');

	//read DB
		dbRef.on("value", function(snapshot){
		 		len = snapshot.numChildren();
				//assin photoname in DB to an array
				for(let i = 0; i < len; i++){
					let id = i + 1;
					const dbRefchild = firebase.database().ref('picture/' + id);
					dbRefchild.on("value", function(snapshot){		
						piddb[i] = snapshot.child("photoid").val();
					});//end dbRefchild.on
				}//end for loop
				removePicture(piddb);
		});//end dbRef.on
		

	//remove picture
	function removePicture(piddb){
		for(let i = 0; i < piddb.length; i++){
			let del = piddb[i];
			if(del == 1){
				dbRef.child(del).remove();
				console.log('picture with id of ' + del + ' was removed');
			}//end if statement
		}//end for loop
	}//end function removePicture



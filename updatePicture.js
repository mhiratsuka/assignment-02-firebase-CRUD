//This JS can update name of picture that is changed in img folder
	const firebase = require('firebase');
	//initialize 
	firebase.initializeApp({
	    databaseURL: "https://serversidesample.firebaseio.com",
	});
	const dbRef = firebase.database().ref('picture');
	let newname = "Langara";

	function updatePicture(id, newName){
		dbRef.child(id).update({photoname:newname});
		console.log('picture with id of ' + `${id}` + ' was updated');
	}

	updatePicture(3, newname);


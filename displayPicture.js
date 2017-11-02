//This JS displays DB results and also create index.html
exports.displayPicture =  function (){
		const firebase = require('firebase');
	    const fs = require("fs");
	    const dir = "img";
	    const dirBuild = "build";
	    const dbRef = firebase.database().ref('picture');
	    let postName ="";
		let len; //to assign how many data(id) has

		display();

		function display(){
			dbRef.on("value", function(snapshot){
		 		len = snapshot.numChildren();
				for(let i = 1; i <= len; i++){
					const dbRefchild = firebase.database().ref('picture/' + i);
					dbRefchild.on("value", function(snapshot){
						let disid = snapshot.child("photoid").val();
						let disname = snapshot.child("photoname").val();
						let dissrc = snapshot.child("photosrc").val();
						let disdate = snapshot.child("uplodedate").val();
						if(disname == null){
							console.log(i + " DB doesn't exists.");
							console.log();
						} else {
console.log("id" + i + " DB:");
console.log("photoid: " + disid);
console.log("picturename: " + disname);
console.log("picturesrc: " + dissrc);
console.log("uplodedate: " + disdate);
console.log();
						}
					});//end dbRefchild.on
				}//end for loop
			});//end dbRef.on 

			indexcreate();
		}//end function display()
    	
    	function indexcreate(){
		    fs.readdir(dir, function(err, files) {
		      if (err){
		        console.log(err);
		      }
			    let i = 0;
			    for(let file of files){
			        fs.readFile(`${dir}/${file}`, function(err, data){
			          if(err){
			            console.log(err);
			          }//end if
			         });//end fs.readFile
			          postName += "<li>" + "<img src='../img/"+ file.slice(0, -4) + ".jpg' alt='" + file.slice(0, -4) + "'></li>";
			    }//end for loop

			    //index.html template
			    let newindexHtml = `
			        <html>
			          <head>
			            <link rel="stylesheet" type="text/css" href="../css/style.css">
			          </head>
			          <body>
			          	<h1>Your images are here</h1>
			            <ul>${postName}</ul>
			          </body>
			        </html>
			      `
			      fs.writeFile(`${dirBuild}/index.html`, newindexHtml .trim(), function(err) {
			          if(err){
			            console.log(err);
			          }
console.log("index.html created");
			      });//end fs.writeFile
			    postName = "";
		    });//end fs.readdir
	}//end function indexcreate
}//end exports.displayPicture

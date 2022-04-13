// import express JS module into app 
// and creates its variable. 
var express = require('express'); 
const cors = require("cors");
var app = express(); 
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
  
// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 

  
// Function callName() is executed whenever  
// url is of the form localhost:3000/name 
app.get('/name', callName); 
// app.get('/name', () => {
//     res.send("aa")
// }); 

app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 

// function callName(req, res) { 
function callName(req, res) { 
    console.log('a')
    res.json("FREEEERE");

    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 

    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
      // var process = spawn('python',["./hello.py", 
    // req.query.firstname, 
    // req.query.lastname] );

    const childPython = spawn('python', ['scripts/script.py', 'a']);
  
    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`exited with code: ${code}`);
    });
} 
  
// save code as start.js 
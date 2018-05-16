//ESTABLISHING CONNECTION WITH THE SQL DATABASE

var mysql = require("mysql");

//MAKE SURE INQUIRER CAN RUN
var inquirer = require("inquirer");

var chosenItem;


//CONNECT

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //AFTER THE CONNECTION IS ESTABLISHED YOU SHOW ALL THE ITEMS IN THE DATABASE

});

//START ASKING WHAT THE CLIENT WANTS TO DO IN THE PROGRAM

function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
        //Show item function
          showItems();
          break;
  
        case "View Low Inventory":
        //Show all inventory that is under 10
          break;
  
        case "Add to Inventory":
        //Run function that will update quantities in the table
          break;
  
        case "Add New Product":
        //Run function that allows you to input new products
          break;
        }
      });
  }

//SHOW THE ITEMS IN THE DATABASE
var showItems = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        console.log(`AVAILABLE ITEMS \n ---------------------------------`)
        //CREATE A FOR LOOP TO SHOW ALL THE ITEMS AVAILABLE
        for (var i = 0; i < res.length; i++) {
            console.log(`
            ID: ${res[i].id}
            Product Name: ${res[i].product_name}
            Department: ${res[i].department_name}
            Price: $${res[i].price}
            Quantity: ${res[i].stock_quantity}
            `)
        }     
    });
}

//FUNCTION TO ASK A QUESTION TO THE CLIENT

var desiresDreams = function () {

    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to buy?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How many do you want to buy?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                // console.log(chosenItem.product_name);
                // console.log(chosenItem.stock_quantity);
                // console.log(chosenItem.id);
                    // determine if bid was high enough
                    if (parseInt(chosenItem.stock_quantity) > answer.bid) {
                        //New quantity amount so it can be displayed
                         newqty = (parseInt(chosenItem.stock_quantity) - answer.bid);
                        // bid was high enough, so update db, let the user know, and start over
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: (parseInt(chosenItem.stock_quantity) - answer.bid)
                                },
                                {
                                    id: chosenItem.id
                                }
                            ],
                        );
                        //Show the updated amounts
                        updatedAmounts();
                    }
                    else {
                        // bid wasn't high enough, so apologize and start over
                        console.log("Not enough available quantity");
                    }
                });
    });
}
//FUNCTION TO SHOW THE UPDATED AMOUNTS

var updatedAmounts = function(){
    connection.query(
        "SELECT * FROM products", function (err, results) {
            console.log(`SUCCESS\nItem: ${chosenItem.product_name}\nNew Available Quantity: ${newqty}`);
            connection.end();
        });
}


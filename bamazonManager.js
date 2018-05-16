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
    start();

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
        lowQty();
          break;
  
        case "Add to Inventory":
        //Run function that will add the item to the table
        addItem();
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
        connection.end();
    });
}

//SHOW THE ITEMS IN THE DATABASE with QTY LOWER THAN 10
var lowQty = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, res) {
        if (err) throw err;
        //console.log(res);
        console.log(`LOW QUANTITY ITEMS \n ---------------------------------`)
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
        connection.end();
    });
}


//FUNCTION TO ADD ITEMS TO THE TABLE

var addItem = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What item do you want to add?",
                
            },
            {
                name: "department",
                type: "input",
                message: "What department is it in?",
                
            },
            {
                name: "price",
                type: "input",
                message: "What is the price",
                
            },
            {
                name: "quantity",
                type: "input",
                message: "Initial quantity?",
                
            }
        ])
        .then(function(answer){
            var newitem = answer.product;
            var department = answer.department;
            var price = parseInt(answer.price);
            var qty = parseInt(answer.quantity);

            connection.query("INSERT INTO products('product_name', 'department_name', 'price', 'stock_quantity') VALUES ?", function (err, res){
                [
                    {
                        product_name: newitem
                    },
                    {
                        department_name: department
                    },
                    {
                        price: price
                    },
                    {
                        stock_quantity: qty
                    }
                ],
                showItems();
            });

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


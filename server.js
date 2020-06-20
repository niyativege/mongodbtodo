var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

var db = require('./config/database');

var app = express();

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });


// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});


// APIS

app.post('/create/user', async function (req, res) {

  try {

    if (!req.body.name) {
      res.status(500).json({
        success: true,
        message: "Name is required"
      });
      return;
    }

    if (!req.body.email_id) {
      res.status(500).json({
        success: true,
        message: "Email id is required"
      });
      return;
    }


    if (!req.body.profile_pic) {
      res.status(500).json({
        success: true,
        message: "Profile pic is required"
      });
      return;
    }



    var new_user = {
      name: req.body.name,
      email_id: req.body.email_id,
      profile_pic: req.body.profile_pic
    }

    // this is sequelize function to insert data into database
    // var result = await users.create(new_user);

    // this is not the right function to insert data into database in mongodb
    /*db.Users.create({
       name: req.body.name,
       email_id: req.body.email_id,
       profile_pic: req.body.profile_pic
    }) */

    // this is the right way of doing it "create is not a mongodb function we use save insted" checkout the mongodb docs which I gave you find out these functions

    var new_user_obj = new db.Users(new_user);

    new_user_obj.save((err, data) => {

        if (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            message: err
          });
          return;
        }

        console.log(data);

        res.status(200).json({
            success: true,
            message: "User Created"
        });
        return;
    });


  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Users.find({})
});


app.get('/get/user', async function (req, res) {

  try {

    // var all_users = await users.findAll();

    // if (all_users.length > 0) {

    //   res.status(200).json({
    //     success: true,
    //     users: all_users
    //   });
    //   return;

    // }
    // else {
    //   res.status(200).json({
    //     success: true,
    //     message: "No users"
    //   });
    //   return;
    // }


  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Users.getUsers({})
});


app.put('/update/user', async function (req, res) {

  try {

    if (!req.body.uid) {
      res.status(500).json({
        success: true,
        message: "uid is required"
      });
      return;
    }

    var update_user = {
      name: req.body.name,
      email_id: req.body.email_id,
      profile_pic: req.body.profile_pic
    }

    // var all_users = await users.update(update_user, {
    //   where: {
    //     uid: req.body.uid
    //   }
    // });

    // if (all_users) {
    //   res.status(200).json({
    //     success: true,
    //     users: all_users
    //   });
    //   return;
    // }
    // else {
    //   res.status(500).json({
    //     success: false,
    //     message: "error"
    //   });
    //   return;
    // }


  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Users.updateUser()


});


app.delete('/remove/user', async function (req, res) {

  try {


    if (!req.body.uid) {
      res.status(500).json({
        success: true,
        message: "uid is required"
      });
      return;
    }

    // var all_users = await users.destroy({
    //   where: {
    //     uid: req.body.uid
    //   }
    // })

    // if (all_users) {
    //   res.status(200).json({
    //     success: true,
    //     users: all_users
    //   });
    //   return;
    // }
    // else {
    //   res.status(500).json({
    //     success: false,
    //     message: "error"
    //   });
    //   return;
    // }



  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Users.dropUser()

});






app.post('/create/todo', async function (req, res) {


  try {

    if (!req.body.uid) {
      res.status(500).json({
        success: true,
        message: "uid is required"
      });
      return;
    }

    if (!req.body.title) {
      res.status(500).json({
        success: true,
        message: "title is required"
      });
      return;
    }

    if (!req.body.description) {
      res.status(500).json({
        success: true,
        message: "description is required"
      });
      return;
    }

    var new_todo = {
      uid: req.body.uid,
      title: req.body.title,
      description: req.body.description,
    }

    // var result = await todo.create(new_todo);

    // if (result) {
    //   res.status(200).json({
    //     success: true,
    //     message: ' todo created'
    //   });
    //   return;
    // }
    // else {
    //   res.status(500).json({
    //     success: false,
    //     message: 'error'
    //   });
    //   return;
    // }

  } catch (err) {

    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
    return;

  }

  // db.Todo.find({})

});

app.get('/get/todo', async function (req, res) {
  try {

    // var result = await users.findAll();

    // if (result.length > 0) {
    //   res.status(200).json({
    //     success: true,
    //     users: result
    //   });
    //   return;

    // }
    // else {
    //   res.status(500).json({
    //     success: false,
    //     message: "error"
    //   });
    //   return;
    // }


  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Todo.find({})

});


app.put('/update/todo', async function (req, res) {

  try {

    if (!req.body.tid) {
      res.status(500).json({
        success: true,
        message: "tid is required"
      });
      return;
    }


    var update_obj = {
      title: req.body.title,
      description: req.body.description,
      deleted: req.body.deleted,
      completed: req.body.completed
    }

    // var result = await todo.update(update_obj, {
    //   where: {
    //     tid: req.body.tid
    //   }
    // })

    // if (result) {
    //   res.status(200).json({
    //     success: true,
    //     message: 'todo updated'
    //   });
    //   return;
    // }
    // else {
    //   res.status(500).json({
    //     success: true,
    //     message: 'error'
    //   });
    //   return;
    // }

  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Todo.update()

})


app.post('/delete/todo', async function (req, res) {
  try {


    if (!req.body.tid) {
      res.status(500).json({
        success: true,
        message: "tid is required"
      });
      return;
    }

    var update_obj = {
      deleted: true
    }

    // var result = await todo.update(update_obj, {
    //   where: {
    //     tid: req.body.tid
    //   }
    // });

    // if (result) {
    //   res.status(200).json({
    //     success: true,
    //     message: ' todo deleted'
    //   });
    //   return;
    // }
    // else {
    //   res.status(500).json({
    //     success: true,
    //     message: 'error'
    //   });
    //   return;
    // }


  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
    return;
  }

  // db.Todo.remove()
})





// intialise server
app.listen(4000, (req, res) => {
  console.log(`Server is running on 4000 port.`);
});
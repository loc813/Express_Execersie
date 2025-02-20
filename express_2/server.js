const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const userRouter = require('./router/user.routes');
const path = require('path');
const todoRouter = require('./router/todo.routes');

// Middleware se hoat dong theo thu tu duoc khai bao
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path to file todo_list_layout.html
let pathPublic = path.join(__dirname, './public/todo_list_layout.html');

// Kiểm tra xem request được gửi lên trên server
// có tồn tại 1 trạng thái status = 1 hay không
// - Nếu có thì tiếp tục response về phía client
// - Nếu không ngay lập tức dừng quá trình req - res cycle
function checkStatus(req, res, next) {
    let status = req.query.status;
    if (status === "1") {
        next();
    } else {
        res.status(404).json({
            message: "Status is not valid"
        });
    }
}

function catchErr (error, req, res ,next) {
    console.log(error);
    res.json({
        message: error,
    });
}

function checkRole(req , res , next){
    let role = req.query.role;
    if(role === "admin"){
        next();
    }else{
        res.status(403).json({
            message: "You are not admin"
        })
    }
}


app.get('/', (req, res) => {
   res.sendFile(pathPublic), (err) => {
       console.log(err);
   }
});



app.get('/about', (req, res) => {
    res.json({
        message: "This is about page",
    });
});

app.get('/users', (req, res) => {
    res.json({
        message: "This is users page",
    });
});

app.get('/test-middleware', checkStatus, checkRole, (req, res) => {
    res.json({
        message: "This is test middleware page",
    });
});

app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
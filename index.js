// import library expressjs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json()) // for parsing application/json

// create logger middleware function
function LoggerMiddleware(req, res, next) {
    console.log(`Request received at: ${new Date()}`);
    next(); // continue process next function
}

app.use(LoggerMiddleware);

// create handling http GET All Customer
app.get('/api/customers', (req, res) => {
    const { keyword, category, limit } = req.query; // request query string by keyword, category, limit

    res.status(200).json({
        message: 'get success data all',
        data: [
            {
                name: 'Hadian Rahmat',
                email: 'hadian.rahmat@gmail.com',
                role: 'jungler'
            },
            {
                name: 'Nana',
                email: 'nana@gmail.com',
                role: 'roam'
            }
        ],
        pagination: {
            total_record: 100,
            current_page: 1,
            total_pages: limit,
        },
        search: {
            keyword: keyword,
            category: category
        }
    })
})

// create handling http POST Add Customer
app.post('/api/customers', LoggerMiddleware, (req, res) => {
    const { name, email, role } = req.body;
    
    res.status(201).json({
        message: "create data customer successfully",
        data: {
            name: name,
            email: email,
            role: role
        }
    })
})

// create handling http GET Detail Customer
app.get('/api/customers/id:', (req, res) => {
    const customerID = req.params.id; // request params by id customers
    res.status(200).json({
        message: 'get success',
        data: {
            customerID: customerID,
            name: 'Hadian Rahmat',
            email: 'hadian.rahmat@gmail.com',
            role: 'jungler'
        }
    })
})

// define listener port using 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
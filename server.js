const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port =process.env.PORT||8080;
var products = [
    { id:1,name:'abc',fn:'xyz',ln:'ijk',branch:'cba',sub:'ECAD' },
    { id:2,name:'xya',fn:'abc',ln:'nmb',branch:'bda',sub:'PP' },
    { id:3,name:'bnm',fn:'uyyt',ln:'ljl',branch:'cs',sub:'CN'},
    { id:4,name:'ytyt',fn:'pop',ln:'rwr',branch:'bda',sub:'BI'},
];

app.get('/', (req, res) => {
    res.send('Welcome to Ganpat REST API!');
});

app.get('/api/students', (req, res) => {
    res.send(products);
})
app.get('/api/students/:id', (req, res) => {
    const product = products.find(({ id }) => id === parseInt(req.params.id));

    if (!product)
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(product);
});

app.post('/api/students', (req, res) => {
 var product = {
        id: products.length + 1,
        name: req.body.name,
        fn: req.body.fn,
        ln: req.body.ln,
        branch: req.body.branch,
        sub: req.body.sub
    };
    products.push(product);
    res.send(product);
});

app.put('/api/students/:id', (req, res) => {
 var product = products.find(({ id }) => id === parseInt(req.params.id));
    if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
    product.name = req.body.name;
    product.fn = req.body.fn;
    product.ln = req.body.ln;
    product.branch = req.body.branch;
    product.sub = req.body.sub;
    res.send(product);
});

app.delete('/api/students/:id', (req, res) => {

 const product = products.find(({ id }) => id === parseInt(req.params.id));
    if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});
app.listen(port,function()
{
console.log("server running on port 8080");
});

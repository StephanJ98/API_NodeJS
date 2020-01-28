const express = require('express');
const faker = require('faker');
const bodyParser = require('body-parser');
const app = express();

//List Users
const users = [];
for (let i = 0; i < 10; i++) {
    let prenom = faker.name.firstName();
    let nom = faker.name.lastName();
    users.push({
            prenom: prenom,
            nom: nom,
            email: prenom + '.' + nom + '@gmail.com'
        });
}

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Api Version
const versionAPI = '/api/v1';

// GET /api/v1/users
app.get(`${versionAPI}/users`, (req, res) => {
    res.json({
        data: users
    })
});

// GET /api/v1/users/:id
app.get(`${versionAPI}/users/:id`, (req, res) => {
    const id = req.params.id - 1;
    res.json({
        data: users[id] || null
    })
});

// POST /api/v1/users
app.post(`${versionAPI}/users`, (req, res) => {
    const data = req.body;
    users.push(data);
    console.log(data);
    res.json({
        index: users.length,
        data: users[users.length - 1]
    })
});

// PUT /api/v1/users/:id
app.put(`${versionAPI}/users/:id`, (req, res) => {
    const data = req.body;
    const id = req.params.id - 1;
    users[id] = Object.assign(users[id], data);
    res.json({
        data: users[id]
    })
});

// DELETE /api/v1/users/:id
app.delete(`${versionAPI}/users/:id`, (req, res) => {
    const id = req.params.id - 1;
    users.splice(id, 1);
    console.log(users.length);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Ecoute sur le port 3000'));
const Joi = require ('joi');
const express = require ('express');
const app = express ();

app.use(express.json());

const courses = [ 
    {id : 1, name:'managing innovation' },
    {id : 2, name:'strategic financial management' },
    {id : 3, name:'management research method' }
]

app.get ('/', (req, res) => {
    res.send ('Welcome to the courses interface!');
})

app.get ('/api/courses', (req,res) => {
    res.send (courses);
} )

app.post ('/api/courses', (req,res) => {
    const schema = {
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send (result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name : req.params.name
    }
    courses.push(course);
    res.send (course)
})

app.get ('/api/courses/:id', (req, res) => {
    let course = courses.find (c => c.id === parseInt (req.params.id));
    if (!course) res.status (404).send ('The course with the Given ID was not found')
    res.send (course)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log (`Listening on port ${port}.....`));
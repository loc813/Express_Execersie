const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to data file
let questionDataPath = path.join(__dirname, '../data/dev-data/questions.json');

//Middleware check exist
const checkExist = (req, res, next) => {
    let questions = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
    let id = Number(req.params.id);
    let question = questions.find(question => question.id === id);
    if (!question) {
        return res.status(404).json({ message: "Question not found" });
    }else{
        req.question = question;
        next();
    }
};

// Get all questions
router.get('/', checkExist, (req, res) => {
    try {
        let questionData = fs.readFileSync(questionDataPath, 'utf8');
        let questions = JSON.parse(questionData);
        res.status(200).json({
            status: 'success',
            data: {
                questions
            }
        });
    } catch (err) {
        console.error("Error reading file:", err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
});

// Get question by ID
router.get('/:id', checkExist,  (req, res) => {
    const id = Number(req.params.id);
    let questionData = fs.readFileSync(questionDataPath, 'utf8');
    let questions = JSON.parse(questionData);
    const question = questions.find(question => question.id === id);
    if (!question) {
        return res.status(404).json({
            status: 'fail',
            message: 'Question not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            question
        }
    });
});


//post new question
router.post('/', checkExist,  (req, res) => {
    let content = req.body.content;
    let question = {
        id: Math.random(),
        content: content,
        like: Math.floor(Math.random() * 10),
        dislike: Math.floor(Math.random() * 10),
    };

    let questionData = fs.readFileSync(questionDataPath, 'utf8');
    let questions = JSON.parse(questionData);
    questions.push(question);
    fs.writeFileSync(questionDataPath, JSON.stringify(questions));
    res.status(201).json({
        status: 'success',
        data: question
    });
});


//update question id 
router.put('/:id', checkExist,  (req, res) => {
    let id = Number(req.params.id);
    let content = req.body.content;
    let questionData = fs.readFileSync(questionDataPath, 'utf8');
    let questions = JSON.parse(questionData);

    let index = questions.findIndex((question) => question.id === id);

    if (index !== -1) {
        questions[index].content = content;
        fs.writeFileSync(questionDataPath, JSON.stringify(questions));
        res.status(200).json({
            status: 'success',
            data: questions[index]
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'Question not found'
        });
    }
});

//delete question id
router.delete('/:id', checkExist, (req, res) => {
    let id = Number(req.params.id);
    let questionData = fs.readFileSync(questionDataPath, 'utf8');
    let questions = JSON.parse(questionData);

    let index = questions.findIndex((question) => question.id === id);

    if (index !== -1) {
        questions.splice(index, 1);
        fs.writeFileSync(questionDataPath, JSON.stringify(questions));
        res.status(204).json({
            status: 'success',
            message: 'Delete question successfully',
            data: null
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'Question not found'
        });
    }
});

module.exports = router;
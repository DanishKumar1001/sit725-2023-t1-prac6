const express = require('express');
const Student = require('../models/studentModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await Student.find({});
    res.render('index', { students: students });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving students");
  }
});

router.post('/addStudent', async (req, res) => {
  try {
    const newStudent = new Student({
      name: req.body.studentName,
      courseName: req.body.courseName,
      grade: req.body.grade,
      score: req.body.score,
      link: req.body.link
    });

    await newStudent.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding student");
  }
});

router.post('/deleteStudent', async (req, res) => {
  try {
    const id = req.body.id;
    await Student.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting student");
  }
});

router.post('/editStudent/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Student.findByIdAndUpdate(id, {
      name: req.body.studentName,
      courseName: req.body.courseName,
      grade: req.body.grade,
      score: req.body.score,
      link: req.body.link
    });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating student");
  }
});

module.exports = router;

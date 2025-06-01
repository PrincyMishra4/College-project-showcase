const express = require('express');
const Model = require('../models/studentModel');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add', (req, res) => {
    
     new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});
router.post('/authenticate', (req, res) => {
    Model.findOne({email: req.body.email})
        .then((result) => {
            if (result) {
                // Verify password
                if (req.body.password !== result.password) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                const { _id, name, email, rollno, department } = result;
                const payload = { _id, name, email };
                
                // Generate token
                const jwt = require('jsonwebtoken');                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({
                                token,
                                name,
                                email,
                                rollno,
                                department,
                                image: result.image,
                                role: 'student'
                            });
                        }
                    }
                )
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Protected endpoint to get current student profile using token
router.get('/profile', verifyToken, (req, res) => {
    // req.user contains the decoded JWT payload from the middleware
    const studentId = req.user._id;

    Model.findById(studentId)
        .select('-password') // Exclude password from the response
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error fetching student profile' });
        });
});

module.exports = router;
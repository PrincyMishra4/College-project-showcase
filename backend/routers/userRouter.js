const express = require('express');
const Model = require('../models/userModel');
const verifyToken = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(500).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Something went wrong' });
            }
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

router.get('/getbyemail/:email', (req, res) => {
    Model.findOne({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});

router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});

// : denotes url parameter
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
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

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
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

                const { _id, name, email, role } = result;
                const payload = { _id, name, email };
                
                // Generate token
                jwt.sign(
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
                                user: {
                                    id: _id,
                                    name,
                                    email,
                                    role: role || 'user'
                                }
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
})

// Protected endpoint to get current user details using token
router.get('/profile', verifyToken, (req, res) => {
    // req.user contains the decoded JWT payload from the middleware
    const userId = req.user._id;

    Model.findById(userId)
        .select('-password') // Exclude password from the response
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error fetching user details' });
        });
});

// Verify token endpoint for client-side authentication
router.get('/verify', async (req, res) => {
    try {
        // Get the token from authorization header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ valid: false, message: 'No token provided' });
        }
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user
        const user = await Model.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ valid: false, message: 'User not found' });
        }
        
        // Return user info
        return res.json({
            valid: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ valid: false, message: 'Invalid token' });
    }
});

module.exports = router;
const router = require('express').Router();
const { User } = require('../models/User');

// add User to DB 
router.post('', async(req, res) => {
    try {
        let user = new User(req.body);
        user = await user.save();
        res.send(user);
    } catch (error) {
        console.log('Error saving User :', error.message);
    }

});


router.get('', async(req, res) => {
    res.send(await User.find());

});



module.exports = router;
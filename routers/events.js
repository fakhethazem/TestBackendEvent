const router = require('express').Router();
const { Event } = require('../models/event');
const { User } = require('../models/User');
const path = require('path');
var multer = require('multer');



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
});
var upload = multer({ storage: storage });


//upload image

router.post('/fileUpload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file)
        res.status(400).send("No file uploaded");
    res.send(file);

    // const imgUrl = `http://localhost:3000/images/uploads/${req.file.filename}`;


    // return res.send(JSON.stringify({ image: imgUrl, file: req.file }));

});




// add Event to DB 
router.post('', upload.single('file'), async(req, res) => {
    try {

        /* let user = await User.findById(req.body.publisher);
         if (!user)
             return res.status(404).send('user id is not found')
         req.body.publisher = {
             first_name: user.first_name,
             id: user._id
         }*/

        let event = new Event(req.body);
        event = await event.save();
        //user.events.push(event._id)
        //   await user.save();
        res.send(event);
    } catch (error) {
        console.log('Error saving Event :', error.message);
    }

});

//find all
router.get('', async(req, res) => {
    res.send(await Event.find());

});

//findById
router.get('/:id', async(req, res) => {
    res.send(await Event.findById(req.params.id));

});

router.put('/:id', async(req, res) => {
    try {
        /*  let user = await User.findById(req.body.publisher);
          if (!user)
              return res.status(404).send('user id is not found')
          req.body.publisher = {
              first_name: user.first_name,
              id: user._id
          }*/
        await Event.updateOne({ _id: req.params.id }, req.body);
        res.send(await Event.findById(req.params.id));
    } catch (error) {
        res.status(400).send('Error updating event :' + error.message);
    }

});

router.delete('/:id', async(req, res) => {
    try {
        let event = await Event.findByIdAndRemove(req.params.id);
        if (!event)
            return res.status(404).send('event with id is not found');
        res.send(event);
    } catch (error) {
        res.status(400).send('Error Deleting course :', error.message);
    }

});



module.exports = router;
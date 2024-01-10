const { default: mongoose, model } = require("mongoose");

const nameSchema = mongoose.Schema({
    UserName : String ,
})

const User = model("User", nameSchema)


const StoreName = async (req, res) => {
    try {

        const result = req.body.name || 'Guest';

        if(result === 'Guest') {
            res.status(500).json({ error: 'Data Not Funded' , status : false });
            return;
        }

        const newUser = await new User({ UserName: result }).save();
        res.json({ name: result , status : true });

    } catch (error) {

        console.error('Error storing name:', error);
        res.status(500).json({ error: 'Internal Server Error' , status : false });
    }
};

module.exports = { StoreName };
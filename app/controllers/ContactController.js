import Contact from "../model/ContactModel.js";


export const contactHandler = async (req, res) => {
    try {
        const {name, email, message} = req.body;

        const newMessage = new Contact({
            name,
            email,
            message
        });
        await newMessage.save();

        res.status(200).json({
            message: "Message sent successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


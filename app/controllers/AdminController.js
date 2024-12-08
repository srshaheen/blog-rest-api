import md5 from "md5";
import AdminModel from "../model/AdminModel.js";
import { EncodeToken } from './../utility/tokenUtility.js';



//create admin
export const createAdmin = async (req, res) => {
    try {
        let reqBody = req.body;
        reqBody.password = md5(req.body.password)
        let admin = await AdminModel.find();
        if(admin.length > 0){
            res.status(200).json({status: "error", message: "have account"})
        }else{
            let data = await AdminModel.create(reqBody);
            res.status(200).json({status: "successfull", data: data});
        }

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}


//admin login
export const adminLogin = async (req, res) => {
    try {
        let reqBody = req.body;
        reqBody.password = md5(req.body.password)

    let data = await AdminModel.aggregate([
        {$match: reqBody},
        {$project: { _id: 1, email: 1}},
    ])

    if(data.length > 0) {
        let token = EncodeToken(data[0]["email"])

        let options = {
            httpOnly: true,
            sameSite: "none",
            secure: false,
        };
        res.cookie("Token", token, options);
        res.status(200).json({
            status: "success", token: token, data: data[0]
        })
    }else{
        res.status(401).json({status: "unauthorized", data: data})
    }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


//adminlogout
export const adminLogout = async (req, res) => {
    try {
        res.clearCookie('Token');
        res.status(200).json({status: 'success'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
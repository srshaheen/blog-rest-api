import Service from "../model/ServiceModel.js";


//getallservices
export const getAllServices = async (req, res) => {
    try {
        const allServicess = await Service.find();

        if(allServicess){
            res.status(200).json({
                message: "Services retrieved successfully",
                data: allServicess,
            })
        }else{
            res.status(404).json({
                message: "Services not found",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })        
    }
}


export const createService = async (req, res) => {
    try {
        const { title, des} = req.body;

        const newService = new Service({
            title,
            des
        });

        const savedService = await newService.save();

        res.status(201).json({
            message: "Service created successfully",
            data: savedService,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}




export const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const updateData = req.body;

        const updatedService = await Service.findByIdAndUpdate(serviceId, updateData, {new: true})

        if(!updatedService){
            return res.status(404).json({
                message: "Service not found",
            })
        }

        res.status(200).json({
            message: "Service updated successfully",
            data: updatedService,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }

}



export const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;

        const deletedService = await Service.findByIdAndDelete(serviceId);

        if(!deletedService){
            return res.status(404).json({
                message: "Service not found",
            })
        }

        res.status(200).json({
            message: 'Service deleted successfully',
            data: deletedService,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


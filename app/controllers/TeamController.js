import TeamMember from "../model/TeamModel.js";


//create teammember
export const createTeamMember = async (req, res) => {
    try {
        const {name, role, email, image } = req.body;

        const newTeamMember = new TeamMember({
            name,
            role,
            email,
            image
        })

        const savedTeamMember = await newTeamMember.save();

        res.status(201).json({
            message: "Team member created Successfully",
            data: savedTeamMember,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


//getall teammember
export const getAllTeamMember = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        if(teamMembers){
            res.status(200).json({
                message: "Team Member retrieved successfully",
                data: teamMembers,
            })
        }else{
            res.status(404).json({
                message: "Team member not found",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

//update Teammember
export const updateTeamMember = async (req, res) => {
    try {
        const teamId = req.params.id;
        const updateData = req.body;
        
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(teamId, updateData, {new: true});

        if(!updatedTeamMember){
            return res.statu(404).json({
                message: "Team member not found",
            });
        }

        res.status(200).json({
            message: "Team Member updated successfully",
            data: updatedTeamMember,
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const deleteTeamMember = async (req, res) => {
    try {
        const teamId = req.params.id;

        const deletedTeamMember = await TeamMember.findByIdAndDelete(teamId);

        if(!deletedTeamMember){
            return res.status(404).json({
                message: "Team member not found",
            })
        }

        res.status(200).json({
            message: "Team Member deleted Successfully",
            data: deletedTeamMember,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


import BlogModel from "../model/BlogModel.js";


//get all blogs
export const getAllBlogs = async (req, res) => {

    try {
        const blogs = await BlogModel.find();
        if(blogs){
            res.status(200).json({
                message: "Blogs retrieved successfully",
                data: blogs,
            })
        }else{
            res.status(404).json({
                message: "Blogs not found",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }

}




//create new blog
export const createBlog = async (req, res) => {
    try {
        const {title, des} = req.body;

        const newBlog = new BlogModel({
            title,
            des
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            message: 'Blog created Successfully',
            data: savedBlog,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


//update blog
export const updateBlog = async (req, res) => {
    try {
        const blogId= req.params.id;
        const updatedData = req.body;

        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updatedData, {new: true});

        if(!updateBlog){
            return res.status(404).json({
                message: 'Blog Not Found',
            })
        }

        res.status(200).json({
            message: "Blog updated successfully",
            data: updatedBlog,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

//Delete Blog
export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);


        if(!deleteBlog){
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        res.status(200).json({
            message: "Blog deleted successfully",
            data: deleteBlog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}





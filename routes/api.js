import express from "express";
const router = express.Router();

import { createBlog, deleteBlog, getAllBlogs, updateBlog } from './../app/controllers/BlogController.js';
import { adminLogin, adminLogout, createAdmin } from "../app/controllers/AdminController.js";
import { createTeamMember, deleteTeamMember, getAllTeamMember, updateTeamMember } from "../app/controllers/TeamController.js";
import { createService, deleteService, getAllServices, updateService } from "../app/controllers/ServiceController.js";
import { contactHandler } from "../app/controllers/ContactController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";


// Users
router.post('/admin', createAdmin)
router.post('/admin/login', adminLogin)
router.get('/admin/logout', adminLogout)



// blog routes
router.get('/blogs', getAllBlogs)
router.post('/blogs',AuthMiddleware, createBlog)
router.put('/blogs/:id',AuthMiddleware, updateBlog)
router.delete('/blogs/:id',AuthMiddleware, deleteBlog)


//team routes
router.get('/teams', getAllTeamMember)
router.post('/teams', AuthMiddleware, createTeamMember)
router.put('/teams/:id',AuthMiddleware, updateTeamMember)
router.delete('/teams/:id',AuthMiddleware, deleteTeamMember)



//Service routes
router.get('/services', getAllServices)
router.post('/services',AuthMiddleware, createService)
router.put('/services/:id',AuthMiddleware, updateService)
router.delete('/services/:id',AuthMiddleware, deleteService)


//Contact Routes
router.post('/contact', contactHandler)



export default router;



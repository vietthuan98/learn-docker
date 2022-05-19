import { Router } from "express";
import { getUsers, createUser } from "@/modules/user/controller";
import { validateCreateUser } from "@/modules/user/validation";

export default (router: Router) => {
	router.get('/users', getUsers)
	router.post('/users', validateCreateUser, createUser)
}
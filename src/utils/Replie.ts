import * as Joi from "joi";

export const createReplieSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
	selecteduser: Joi.number(),
	selectedthread: Joi.number(),
});

export const updateReplieSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
});
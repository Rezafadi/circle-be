import * as Joi from "joi";

export const createThreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
	selecteduser: Joi.number(),
});

export const updateThreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
});

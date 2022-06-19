import { Request, Response } from "express";
import eventsModel from "../models/events.models";


export const eventsListController = async function(req: Request, res: Response) {
  try {
    const queryString = req.query;
    if (!queryString.title) {
      const events = await eventsModel.find({}).sort({createdAt: -1}).limit(20);
      return res.status(200).json({success: true, code: 200, data: events});
    } else {
      const events = await eventsModel.find({ title: {$regex: `${queryString.title}`, $options: "i"}}).sort("-createdAt").limit(20);
      return res.status(200).json({success: true, code: 200, data: events});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, code: 500, error: 'internal server error'});
  }
}


export const eventsAddController = async function(req: Request, res: Response) {
  try {
    if (!req.body.title || req.body.title.length === 0) return res.status(400).json({message: "title may not be blank"});
    if (!req.body.description || req.body.description.length < 5) return res.status(400).json({message: "description may not be blank"});
    if (!req.body.category || req.body.category.length === 0) return res.status(400).json({message: "category may not be blank"});
    if (!req.body.address || req.body.address.length === 0) return res.status(400).json({message: "address may not be blank"});
    if (!req.body.date || req.body.date.length === 0) return res.status(400).json({message: "date may not be blank"});

    const {title, description, category, date, isVirtual, address} = req.body;

    const newEvent = new eventsModel({
      title,
      description,
      category,
      isVirtual,
      date,
      address
    });

    await newEvent.save();
    return res.status(201).json({success: true, code: 201, message: "event registered successfully"}); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, code:500, error: 'internal server error'});
  }
}
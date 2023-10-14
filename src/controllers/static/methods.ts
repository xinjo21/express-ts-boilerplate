import { Request, Response } from "express";

/* 

        C R U D  operation of MongoDB

*/

// GET ALL
export async function GET(req: Request, res: Response, data: Object) {
  try {
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}

// GET A SPECIFIC DATA
export async function GETSPECIFIC(
  req: Request,
  res: Response,
  id: String,
  Schema: any
) {
  try {
    const data = await Schema.findById(id);
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
}

// CREATE A DOCUMENT
export async function CREATE(req: Request, res: Response, data: any) {
  try {
    await data.save();
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

// UPDATE A DOCUMENT
export async function UPDATE(
  req: Request,
  res: Response,
  id: String,
  data: Object,
  Schema: any
) {
  try {
    await Schema.findByIdAndUpdate(id, data, { new: true });
    return res.status(201).json({ message: "Success" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

// DELETE A DOCUMENT
export async function DELETE(
  req: Request,
  res: Response,
  id: String,
  Schema: any
) {
  try {
    await Schema.findByIdAndDelete(id);
    return res.status(200).send({ message: "Successfully deleted" });
  } catch (erorr: any) {
    return res.status(404).json({ message: erorr.message });
  }
}

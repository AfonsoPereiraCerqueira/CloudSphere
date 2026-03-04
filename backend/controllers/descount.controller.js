import Descount from "../models/descounts.model.js";

export const getDescounts = async (req, res) => {
    try {
        const descounts = await Descount.find({});
        res.status(200).json(descounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

export const getSingleDescount = async (req, res) => {
    try {
        const { id } = req.body;
        const descount = await Descount.findById(id);

        if (!descount) {
            res.status(404).json({ message: "Descount Not Found" });
        }

        res.status(200).json(descount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createDescount = async (req, res) => {
    try {
        const descount = await Descount.create(req.body);
        res.status(200).json(descount);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const verifyDescount = async (req, res) => {
    try {
        const { descountName } = req.body;
        const descount = await Descount.findOne({ descountName });

        if (!descount) {
            return res.status(401).json({ message: "Descount not found" });
        }

        res.status(200).json({ success: true, descount: {
            ...descount._doc,
        } });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
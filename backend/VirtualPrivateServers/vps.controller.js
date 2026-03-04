import VPS from "../models/vps.model.js"
import { generateVPSName, generateRandomIP, generateRandomLocation, generateRandomOS, generateRandomPassword, generateRandomPort } from "../utils/generateVPS.js"

export const generateNewVPS = async (req, res) => {

      const { UserId } = req.body;

      try {

            const vpsName = generateVPSName();
            const vpsIP = generateRandomIP();
            const vpsPort = generateRandomPort();
            const vpsUsername = "Administrator";
            const vpsPassword = generateRandomPassword();
            const vpsType = "Dedicated";
            const vpsStatus = "ON";
            const vpsOS = generateRandomOS();
            const vpsLocation = generateRandomLocation();

            const vps = await VPS.create({
                  UserId,
                  vpsName,
                  vpsIP,
                  vpsPort,
                  vpsUsername,
                  vpsPassword,
                  vpsType,
                  vpsStatus,
                  vpsOS,
                  vpsLocation
            });

            vps.save();
            res.status(201).json({ success: true, vps });
      } catch (error) {
            res.status(500).json({ success: false, message: error.message })
      }
};

export const getVPS = async (req, res) => {

      const { userId } = req.body;

      try {
            const vps = await VPS.find({ UserId: userId });

            if (!vps) {
                  return res.status(404).json({ success: false, message: "VPS not found" });
            }

            res.status(200).json({ success: true, vps });
      } catch (error) {
            res.status(500).json({ success: false, message: error.message })
      }
};

export const TurnOffVPS = async (req, res) => {
      
      const { userId } = req.body;

      try {

            const vps = await VPS.findOne({ UserId: userId });

            if (!vps) {
                  return res.status(404).json({ success: false, message: "VPS not found" });
            };

            vps.vpsStatus = "OFF";
            vps.save();

            res.status(200).json({ success: true, vps });
            
      } catch (error) {
            res.status(500).json({ success: false, message: error.message })
      }
};

export const TurnOnVPS = async (req, res) => {
      
      const { userId } = req.body;

      try {

            const vps = await VPS.findOne({ UserId: userId });

            if (!vps) {
                  return res.status(404).json({ success: false, message: "VPS not found" });
            }

            vps.vpsStatus = "ON";
            vps.save();

            res.status(200).json({ success: true, vps });
            
      } catch (error) {
            res.status(500).json({ success: false, message: error.message })
      }
};

export const RebootVPS = async (req, res) => {
      
      const { userId } = req.body;

      try {

            const vps = await VPS.findOne({ UserId: userId });

            if (!vps) {
                  return res.status(404).json({ success: false, message: "VPS not found" });
            }

            vps.vpsStatus = "REBOOTING";
            vps.save();

            res.status(200).json({ success: true, vps });

            setTimeout(() => {
                  vps.vpsStatus = "ON";
                  vps.save();
            }, 5000);

      } catch (error) {
            res.status(500).json({ success: false, message: error.message })
      };
};
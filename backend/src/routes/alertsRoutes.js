import express from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const router = express.Router();
const prisma = new PrismaClient();

const alertSchema = z.object({
  deviceId: z.string().uuid("Invalid device ID"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  description: z.string().min(5, "Description is too short"),
  status: z.enum(["ACTIVE", "RESOLVED"]).optional(),
});

router.get("/", async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({
      include: { device: true }, 
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await prisma.alert.findUnique({ where: { id } });
    if (!alert) return res.status(404).json({ success: false, message: "Alert not found" });
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsed = alertSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.errors });
    }
    const { deviceId, severity, description, status } = parsed.data;

    const alert = await prisma.alert.create({
      data: {
        deviceId,
        severity,
        description,
        status: status || "ACTIVE",
      },
    });
    res.status(201).json({ success: true, message: "Alert created", data: alert });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateSchema = alertSchema.partial(); 
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.errors });
    }

    const alert = await prisma.alert.update({
      where: { id },
      data: parsed.data,
    });
    res.json({ success: true, message: "Alert updated", data: alert });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Alert not found" });
    }
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.alert.delete({ where: { id } });
    res.json({ success: true, message: "Alert deleted" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Alert not found" });
    }
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

export default router;

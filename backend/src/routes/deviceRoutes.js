const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

/**
 * @route   GET /devices
 * @desc    Get all devices
 */
router.get('/', async (req, res) => {
  try {
    const devices = await prisma.device.findMany({
      include: { alerts: true },
    });
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch devices', details: error.message });
  }
});

/**
 * @route   GET /devices/:id
 * @desc    Get a single device by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const device = await prisma.device.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { alerts: true },
    });

    if (!device) return res.status(404).json({ message: 'Device not found' });

    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching device', details: error.message });
  }
});

/**
 * @route   POST /devices
 * @desc    Add a new device
 */
router.post('/', async (req, res) => {
  const { name, location, status } = req.body;

  if (!name || !location)
    return res.status(400).json({ error: 'Name and location are required' });

  try {
    const newDevice = await prisma.device.create({
      data: { name, location, status: status || 'active' },
    });

    res.status(201).json({ message: 'Device added successfully', device: newDevice });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add device', details: error.message });
  }
});

/**
 * @route   PUT /devices/:id
 * @desc    Update device details
 */
router.put('/:id', async (req, res) => {
  const { name, location, status } = req.body;

  try {
    const updatedDevice = await prisma.device.update({
      where: { id: parseInt(req.params.id) },
      data: { name, location, status },
    });

    res.status(200).json({ message: 'Device updated successfully', device: updatedDevice });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(500).json({ error: 'Failed to update device', details: error.message });
  }
});

/**
 * @route   DELETE /devices/:id
 * @desc    Delete a device
 */
router.delete('/:id', async (req, res) => {
  try {
    await prisma.device.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(500).json({ error: 'Failed to delete device', details: error.message });
  }
});

module.exports = router;

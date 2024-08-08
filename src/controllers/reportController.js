const Report = require('../models/reportModel');

exports.generateUsageReport = async (req, res) => {
  try {
    const report = await Report.generateUsageReport();
    res.json({ report });
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el reporte', error: error.message });
  }
};

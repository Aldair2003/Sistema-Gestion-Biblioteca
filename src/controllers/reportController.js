const Report = require('../models/reportModel');

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.getAllReports();
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los informes', error: error.message });
  }
};

exports.getReportDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.getReportById(id);
    if (!report) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.json({ report });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles del informe', error: error.message });
  }
};
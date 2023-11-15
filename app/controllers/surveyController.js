const db = require("../../config/db");

const surveyController = {
  getAllSurveys: async (req, res) => {
    try {
      const surveys = await db.any("SELECT * FROM survey");
      res.json(surveys);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createSurvey: async (req, res) => {
    const { name, description } = req.body;
    console.log('Here is the request body :',req.body)
    try {
      await db.one(
        "INSERT INTO survey(name, description) VALUES($1, $2) RETURNING *",
        [name, description]
      );
      res.json({ message: "Survey created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = surveyController;

const db = require("../../config/db");

const questionController = {
  getAllQuestions: async (req, res) => {
    try {
      const questions = await db.any("SELECT * FROM  question");
      res.json(questions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createQuestion: async (req, res) => {
    const {
      name,
      type,
      required,
      text,
      description,
      options,
      file_properties,
    } = req.body;
    try {
      let formattedOptions;
      if (type === "choice") {
        formattedOptions = options ? options : null;
      } else if (type === "file") {
        formattedOptions = options ? options : null;
      } else {
        formattedOptions = null; // For other question types where options are not applicable
      }

      await db.none(
        "INSERT INTO question(name, type, required, text, description, options, file_properties) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          name,
          type,
          required,
          text,
          description,
          formattedOptions,
          file_properties,
        ]
      );

      res.json({ message: "Question created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateQuestion: async (req, res) => {
    const questionId = req.params.id;
    const {
      name,
      type,
      required,
      text,
      description,
      options,
      file_properties,
    } = req.body;

    try {
      await db.none(
        "UPDATE question SET name=$1, type=$2, required=$3, text=$4, description=$5, options=$6::jsonb, file_properties=$7 WHERE question_id=$8",
        [
          name,
          type,
          required,
          text,
          description,
          options,
          file_properties,
          questionId,
        ]
      );
      res.json({ message: "Question updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteQuestion: async (req, res) => {
    const questionId = req.params.id;
    try {
      await db.none("DELETE FROM question WHERE question_id=$1", [questionId]);
      res.json({ message: "Question deleted succesfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = questionController;

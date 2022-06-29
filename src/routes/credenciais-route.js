const express = require("express");
const router = express.Router();

router.post("/add", async (request, response) => {
    console.log(`/add`);    
    try {
      await credencial.save();
      response.send(credencial);
    } catch (error) {
      response.status(500).send(error);
    }
});

router.get("/listAll", async (request, response) => {
    console.log(`/credenciais`)
    const credenciais = await credenciaisModel.find({});
  
    try {
      response.send(credenciais);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = router;
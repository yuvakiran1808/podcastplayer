
const Podcast = require("../models/podcast");



exports.createPodcast = (req,res,next)=>{


          const {name,description,speaker,type} = req.body;

          let video = '';
          let audio = '';

          if (req.file.mimetype.includes('video')) {
            video = req.file.path;
          } else if (req.file.mimetype.includes('audio')) {
            audio = req.file.path;
          } else {
            return res.status(400).json({ error: 'Invalid file type' });
          }

         

          const podcast = new Podcast({
            name,
            description,
            speaker,
            type,
            video,
            audio,
          });
        
          podcast
          .save()
          .then((result) => {
            res.status(201).json({
              message: 'Podcast created successfully',
              podcast: result,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
          });       
}

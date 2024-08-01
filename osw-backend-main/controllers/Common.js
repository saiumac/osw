const Check = async (req, res) => {
    // #swagger.tags = ['Common']
    res.send({message:"It will work on it."})
}

const Upload = async (req, res) => {
        // #swagger.tags = ['Common']
        /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['files'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Upload file here...support only [png,jpeg,jpg]',
        },
        */
      const files = req.files;
      if(!files || files.length === 0) return res.status(400).send('No image in the request')

      const file_paths = files.map(file => `media/uploads/${file.filename}`);
      res.send({message:"uploaded file.", file_paths})
}


module.exports = {Check,Upload};
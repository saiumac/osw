const ThisModel         =     require('../models/OswFavourite')
const Helper            =     require("../helper/helper");

const create = async (req, res) => {
  // #swagger.tags = ['Favourite']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["fav_name"], 
        "properties": { 
          "fav_name": { 
            "type": "string",
          },
        } 
      } 
    }
  */
  try{
      const record = await ThisModel.create(req.body)

      res.status(201).json({message:"fav added succefully!", record});
  }catch (error){
      console.error('Error fav create:', error);
      res.status(500).json({ error: 'Failed to creating fav.',error:error.message });
  }
}


const list = async (req, res) => {
    // #swagger.tags = ['Favourite']
    //  #swagger.parameters['page_size'] = {in: 'query',type:'number'}
    //  #swagger.parameters['page'] = {in: 'query',type:'number'}
    try {
        let pageSize = 0;
        let skip = 0;
        let query={}
        query['where'] = {}
        if(req.query.fav_status){
          query['where']['fav_status'] = req.query.fav_status
        }
        if(req.query.page && req.query.page_size){
            if(req.query.page >= 0 && req.query.page_size > 0){
              pageSize = req.query.page_size;
              skip = req.query.page * req.query.page_size;
            }
            query['offset'] = parseInt(skip)
            query['limit'] = parseInt(pageSize)
        }
        query['distinct'] = true
        const records = await ThisModel.findAndCountAll(query);
        return await Helper.SuccessValidation(req,res,records)
    } catch (err) {
        console.error('Error retrieving records:', err);
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
};

const view = async (req, res) => {
    // #swagger.tags = ['Favourite']
    let query={}
    query['where'] = {}
    let record = await ThisModel.findByPk(req.params.fav_id,query);
    if(!record){
      return await Helper.ErrorValidation(req,res,{message:"record not found!"})
    }
    return await Helper.SuccessValidation(req,res,record)
}

const update = async (req, res) => {
    // #swagger.tags = ['Favourite']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": [], 
        "properties": { 
          "fav_name": { 
            "type": "string",
          },
          "fav_status": { 
            "type": "string",
          },
        } 
      } 
    }
  */
    
    let Allrecords = await ThisModel.count({where:{fav_id :req.params.fav_id }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{fav_id :req.params.fav_id }}).then(async(record) => {
        record = await ThisModel.findByPk(req.params.fav_id );
        return await Helper.SuccessValidation(req,res,record,'Updated successfully')
      }).catch( async (err) => {
        return await Helper.ErrorValidation(req,res,err,'cache')
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'Fav with this id not found'},'cache')
    }
}

const updateBulk = async (req, res) => {
  // #swagger.tags = ['Favourite']
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "type": "array",
        "items": {
          "properties": {
            "fav_id": {
              "type": "integer",
              "description": "ID of the product to update"
            },
            "name": {
              "type": "string",
              "description": "Name of the product"
            },
            "ssb_price": { 
              "type": "string",
              "default":"0"
            },
            "pd_price": { 
              "type": "string",
              "default":"0"
            },
            "status": { 
              "type": "string",
            },
          }
        }
      }
    }
  */
  const updates = req.body;

  if (!Array.isArray(updates)) {
    return await Helper.ErrorValidation(req, res, { message: 'Request body must be an array of updates' }, 'cache');
  }

  try {
    for (const update of updates) {
      const { fav_id, reason, action_msg, ...data } = update;
      const recordExists = await ThisModel.count({ where: { fav_id } });

      if (recordExists > 0) {
        await ThisModel.update(data, { where: { fav_id } });
      } else {
        return await Helper.ErrorValidation(req, res, { message: `Administrator with id ${fav_id} not found` }, 'cache');
      }
    }
    return await Helper.SuccessValidation(req, res,{ message:'Bulk update successful'});
  } catch (error) {
    console.error('Error during bulk update:', error);
    return await Helper.ErrorValidation(req, res, error, 'cache');
  }
};

const remove = async (req, res) => {
    // #swagger.tags = [ 'Favourite']
    try{
        let record = await ThisModel.destroy({where:{fav_id :req.params.fav_id }})
        return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
    } catch (err) {
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
}

const bulkremove = async (req, res) => {
  // #swagger.tags = ['Favourite']
    let theArray = req.params.fav_id  
    if(!Array.isArray(theArray)){theArray = theArray.split(",");}
    for (let index = 0; index < theArray.length; ++index) {
      const rowid = theArray[index];
      await ThisModel.destroy({where:{fav_id :rowid}}).then((response) => {}).catch((err) => {});
    }
    return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
}

const exportCSV = async (req, res) => {
  // #swagger.tags = ['Favourite']
  try {
    let query = {};
    query['where'] = {};
    const records = await ThisModel.findAll(query);

    if (!records || records.length === 0) {
      return await Helper.ErrorValidation(req,res,'cache');
    }

    // Create CSV header
    let csvHeader = 'S.No,Product Name,Stage Name,Stage Code,Documents Link';
    csvHeader += '\n';

    // Create CSV rows
    let csvData = '';
    let serialNo = 1;

    records.forEach(record => {
      let row = `${serialNo},${record.name},${record.stage_name},${record.code},${record.document}`;
      csvData += row + '\n';
      serialNo++;
    });

    const csvContent = csvHeader + csvData;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="sectors_data.csv"`);

    res.send(csvContent);
  } catch (error) {
    console.error('Error exporting data to CSV:', error);
    res.status(500).send('Error exporting data to CSV');
  }
};



module.exports = { create, list, view, update, remove, bulkremove,exportCSV }
const ThisModel         =     require('../models/OswCompanySector')
const nodemailer        =     require('nodemailer')
const Helper            =     require("../helper/helper");


const create = async (req, res) => {
    // #swagger.tags = ['CompanySector']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["name","ssb_price","pd_price"], 
        "properties": { 
          "name": { 
            "type": "string",
            "description": 'name of the sector'
          },
          "ssb_price": { 
            "type": "string",
            "default":"0"
          },
          "pd_price": { 
            "type": "string",
            "default":"0"
          },
        } 
      } 
    }
  */
  try{
      const record = await ThisModel.create(req.body)
      return await Helper.SuccessValidation(req,res,record,'Sector Added successfully')
  }catch (err){
      console.error('Error creating record:', err);
      return await Helper.ErrorValidation(req,res,err,{message:"cache"})
  }
}


const list = async (req, res) => {
    // #swagger.tags = ['CompanySector']
    //  #swagger.parameters['page_size'] = {in: 'query',type:'number'}
    //  #swagger.parameters['page'] = {in: 'query',type:'number'}
    try {
        let pageSize = 0;
        let skip = 0;
        let query={}
        query['where'] = {}
        if(req.query.status){
          query['where']['status'] = req.query.status
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
    // #swagger.tags = ['CompanySector']
    let record = await ThisModel.findByPk(req.params.id);
    if(!record){
      return await Helper.ErrorValidation(req,res,{message:"record not found!"})
    }
    return await Helper.SuccessValidation(req,res,record)
}

const update = async (req, res) => {
    // #swagger.tags = ['CompanySector']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "properties": { 
            "name": { 
              "type": "string",
              "description": 'name of the sector'
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
    */
    let Allrecords = await ThisModel.count({where:{id :req.params.id }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{id :req.params.id }}).then(async(record) => {
        record = await ThisModel.findByPk(req.params.id );
        return await Helper.SuccessValidation(req,res,record,'Updated successfully')
      }).catch( async (err) => {
        return await Helper.ErrorValidation(req,res,err,'cache')
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'Sector with this id not found'},'cache')
    }
}

const updateBulk = async (req, res) => {
  // #swagger.tags = ['CompanySector']
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "type": "array",
        "items": {
          "properties": {
            "id": {
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
      const { id, reason, action_msg, ...data } = update;
      const recordExists = await ThisModel.count({ where: { id } });

      if (recordExists > 0) {
        await ThisModel.update(data, { where: { id } });
      } else {
        return await Helper.ErrorValidation(req, res, { message: `Sector with id ${id} not found` }, 'cache');
      }
    }
    return await Helper.SuccessValidation(req, res,{ message:'Bulk update successful'});
  } catch (error) {
    console.error('Error during bulk update:', error);
    return await Helper.ErrorValidation(req, res, error, 'cache');
  }
};

const remove = async (req, res) => {
    // #swagger.tags = ['CompanySector']
    try{
        let record = await ThisModel.destroy({where:{id :req.params.id }})
        return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
    } catch (err) {
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
}

const bulkremove = async (req, res) => {
  // #swagger.tags = ['CompanySector']
    let theArray = req.params.id  
    if(!Array.isArray(theArray)){theArray = theArray.split(",");}
    for (let index = 0; index < theArray.length; ++index) {
      const rowid = theArray[index];
      await ThisModel.destroy({where:{id :rowid}}).then((response) => {}).catch((err) => {});
    }
    return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
}

const exportCSV = async (req, res) => {
  // #swagger.tags = ['CompanySector']
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
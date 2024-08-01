const ThisModel         =     require('../models/OswResourcesNew')
const User              =     require('../models/User')
const Company           =     require('../models/OswCompany')
const Helper            =     require("../helper/helper");
const md5               =     require('md5');

const create = async (req, res) => {
  // #swagger.tags = ['Resources']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["resources_name","resources_file_name","resources_file_type","for_ssb_pdp","password","company","is_primary"], 
        "properties": { 
          "resources_name": { 
            "type": "string",
          },
          "resources_description": { 
            "type": "string",
          },
          "resources_file_name": { 
            "type": "string",
          },
          "resources_file_type": { 
            "type": "string",
          },
          "resources_file_extension": { 
            "type": "string",
          },
          "for_ssb_pdp": { 
            "type": "string",
          },
          "is_for_demo": { 
            "type": "string",
          },
        } 
      } 
    }
  */
  try{
      const user = await User.findByPk(req.user.userId)
      const company = await Company.findOne({where:{user_id:req.user.userId}})
      req.body['uploaded_user_id'] = user.user_id;
      req.body['uploaded_user_type'] = user.user_type;
      req.body['uploaded_company_id'] = company.company_id || '';
      req.body['uploaded_date'] = Helper.CurrentDate();
      req.body['list_of_companies'] = req.body.company;
      const record = await ThisModel.create(req.body)

      res.status(201).json({message:"resource added succefully!", record});
  }catch (error){
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user.',error:error.message });
  }
}


const list = async (req, res) => {
    // #swagger.tags = ['Resources']
    //  #swagger.parameters['file_type'] = {in: 'query',type:'string',required:true,enum:["File","Video"]}
    //  #swagger.parameters['page_size'] = {in: 'query',type:'number'}
    //  #swagger.parameters['page'] = {in: 'query',type:'number'}
    try {
        let pageSize = 0;
        let skip = 0;
        let query={}
        query['where'] = {}
        if(req.query.is_delete){
          query['where']['is_delete'] = req.query.is_delete
        }
        if(req.query.file_type === "File"){
          query['where']['resources_file_type'] = 1
        }else{
          query['where']['resources_file_type'] = 2
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
    // #swagger.tags = ['Resources']
    let query={}
    query['where'] = {}
    let record = await ThisModel.findByPk(req.params.resource_id,query);
    if(!record){
      return await Helper.ErrorValidation(req,res,{message:"record not found!"})
    }
    return await Helper.SuccessValidation(req,res,record)
}

const update = async (req, res) => {
    // #swagger.tags = ['Resources']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": [], 
        "properties": { 
          "resources_name": { 
            "type": "string",
          },
          "resources_description": { 
            "type": "string",
          },
          "resources_file_name": { 
            "type": "string",
          },
          "resources_file_type": { 
            "type": "string",
          },
          "resources_file_extension": { 
            "type": "string",
          },
          "for_ssb_pdp": { 
            "type": "string",
          },
          "is_for_demo": { 
            "type": "string",
          },
          "is_deleted": { 
            "type": "string",
          },
        } 
      } 
    }
  */
    
    let Allrecords = await ThisModel.count({where:{resource_id :req.params.resource_id }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{resource_id :req.params.resource_id }}).then(async(record) => {
        record = await ThisModel.findByPk(req.params.resource_id );
        return await Helper.SuccessValidation(req,res,record,'Updated successfully')
      }).catch( async (err) => {
        return await Helper.ErrorValidation(req,res,err,'cache')
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'Sector with this id not found'},'cache')
    }
}

const updateBulk = async (req, res) => {
  // #swagger.tags = ['Resources']
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "type": "array",
        "items": {
          "properties": {
            "resource_id": {
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
      const { resource_id, reason, action_msg, ...data } = update;
      const recordExists = await ThisModel.count({ where: { resource_id } });

      if (recordExists > 0) {
        await ThisModel.update(data, { where: { resource_id } });
      } else {
        return await Helper.ErrorValidation(req, res, { message: `Administrator with id ${resource_id} not found` }, 'cache');
      }
    }
    return await Helper.SuccessValidation(req, res,{ message:'Bulk update successful'});
  } catch (error) {
    console.error('Error during bulk update:', error);
    return await Helper.ErrorValidation(req, res, error, 'cache');
  }
};

const remove = async (req, res) => {
    // #swagger.tags = [ 'Resources']
    try{
        let record = await ThisModel.destroy({where:{resource_id :req.params.resource_id }})
        return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
    } catch (err) {
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
}

const bulkremove = async (req, res) => {
  // #swagger.tags = ['Resources']
    let theArray = req.params.resource_id  
    if(!Array.isArray(theArray)){theArray = theArray.split(",");}
    for (let index = 0; index < theArray.length; ++index) {
      const rowid = theArray[index];
      await ThisModel.destroy({where:{resource_id :rowid}}).then((response) => {}).catch((err) => {});
    }
    return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
}

const exportCSV = async (req, res) => {
  // #swagger.tags = ['Resources']
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
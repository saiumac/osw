const ThisModel         =     require('../models/OswAdministrator')
const User              =     require('../models/User')
const Helper            =     require("../helper/helper");
const md5               =     require('md5');

const create = async (req, res) => {
  // #swagger.tags = ['Administrator']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["first_name","last_name","email","user_name","password","company","is_primary"], 
        "properties": { 
          "first_name": { 
            "type": "string",
          },
          "last_name": { 
            "type": "string",
          },
          "mobile": { 
            "type": "string",
          },
          "email": { 
            "type": "string",
          },
          "password": { 
            "type": "string",
          },
          "user_name": { 
            "type": "string",
          },
          "company": { 
            "type": "string",
          },
          "is_primary": { 
            "type": "string",
            "description":"1 => Primary, 0 => Secondary"
          },
          "fax": { 
            "type": "string",
          },
        } 
      } 
    }
  */
  try{
      const {user_name,password } = req.body
      const check = await User.findOne({ where: { user_name } });
      if (check) {
          return res.status(400).json({ error: 'User already exists with given username.' });
      }
      // hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = md5(password);
      // Create a user   
      const user = await User.create({user_name,pwd:hashedPassword,user_type:1})
      // Create a member
      req.body['user_id'] = user.user_id;
      // req.body['crdate'] = Helper.CurrentDate();
      req.body['list_of_companies'] = req.body.company;
      const administrator = await ThisModel.create(req.body)
      let result = {
        user,
        administrator
      }
      res.status(201).json({message:"administrator added succefully!", result});
  }catch (error){
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user.',error:error.message });
  }
}


const list = async (req, res) => {
    // #swagger.tags = ['Administrator']
    //  #swagger.parameters['page_size'] = {in: 'query',type:'number'}
    //  #swagger.parameters['page'] = {in: 'query',type:'number'}
    try {
        let pageSize = 0;
        let skip = 0;
        let query={}
        query['where'] = {}
        query['where']['is_deleted'] = '0'

        // if(req.query.is_delete){
        //   query['where']['is_delete'] = req.query.is_delete
        // }
        if(req.query.page && req.query.page_size){
            if(req.query.page >= 0 && req.query.page_size > 0){
              pageSize = req.query.page_size;
              skip = req.query.page * req.query.page_size;
            }
            query['offset'] = parseInt(skip)
            query['limit'] = parseInt(pageSize)
        }
        query['include'] = [
          {
            model:Model.User,
            attributes:["user_name"]
          },
          {
            model:Model.OswCompany,
            as:"Company",
            attributes:["company_name"]
          },
        ]
        query['distinct'] = true
        const records = await ThisModel.findAndCountAll(query);
        return await Helper.SuccessValidation(req,res,records)
    } catch (err) {
        console.error('Error retrieving records:', err);
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
};

const view = async (req, res) => {
    // #swagger.tags = [ 'Administrator']
    let query={}
    query['where'] = {}
    query['include'] = [
      {
        model:Model.User,
        attributes:["user_name"]
      },
      {
        model:Model.OswCompany,
        as:"Company",
        attributes:["company_name"]
      },
    ]
    let record = await ThisModel.findByPk(req.params.administrator_id,query);
    if(!record){
      return await Helper.ErrorValidation(req,res,{message:"record not found!"})
    }
    return await Helper.SuccessValidation(req,res,record)
}

const update = async (req, res) => {
    // #swagger.tags = [ 'Administrator']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": [], 
        "properties": { 
          "first_name": { 
            "type": "string",
          },
          "last_name": { 
            "type": "string",
          },
          "mobile": { 
            "type": "string",
          },
          "email": { 
            "type": "string",
          },
          "password": { 
            "type": "string",
          },
          "user_name": { 
            "type": "string",
          },
          "company": { 
            "type": "string",
          },
          "is_primary": { 
            "type": "string",
          },
          "fax": { 
            "type": "string",
          },
          "is_deleted": { 
            "type": "string",
          },
        } 
      } 
    }
  */
    
    let Allrecords = await ThisModel.count({where:{administrator_id :req.params.administrator_id }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{administrator_id :req.params.administrator_id }}).then(async(record) => {
        record = await ThisModel.findByPk(req.params.administrator_id );
        return await Helper.SuccessValidation(req,res,record,'Updated successfully')
      }).catch( async (err) => {
        return await Helper.ErrorValidation(req,res,err,'cache')
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'Sector with this id not found'},'cache')
    }
}

const updateBulk = async (req, res) => {
  // #swagger.tags = [ 'Administrator']
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "type": "array",
        "items": {
          "properties": {
            "administrator_id": {
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
      const { administrator_id, reason, action_msg, ...data } = update;
      const recordExists = await ThisModel.count({ where: { administrator_id } });

      if (recordExists > 0) {
        await ThisModel.update(data, { where: { administrator_id } });
      } else {
        return await Helper.ErrorValidation(req, res, { message: `Administrator with id ${administrator_id} not found` }, 'cache');
      }
    }
    return await Helper.SuccessValidation(req, res,{ message:'Bulk update successful'});
  } catch (error) {
    console.error('Error during bulk update:', error);
    return await Helper.ErrorValidation(req, res, error, 'cache');
  }
};

const remove = async (req, res) => {
    // #swagger.tags = [ 'Administrator']
    try{
        let record = await ThisModel.destroy({where:{administrator_id :req.params.administrator_id }})
        return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
    } catch (err) {
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
}

const bulkremove = async (req, res) => {
  // #swagger.tags = [ 'Administrator']
    let theArray = req.params.administrator_id  
    if(!Array.isArray(theArray)){theArray = theArray.split(",");}
    for (let index = 0; index < theArray.length; ++index) {
      const rowid = theArray[index];
      await ThisModel.destroy({where:{administrator_id :rowid}}).then((response) => {}).catch((err) => {});
    }
    return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
}

const exportCSV = async (req, res) => {
  // #swagger.tags = [ 'Administrator']
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
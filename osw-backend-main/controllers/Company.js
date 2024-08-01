const ThisModel         =     require('../models/OswCompany')
const User              =     require('../models/User')
const Administrator     =     require('../models/OswAdministrator')
const CompanyLicence    =     require('../models/OswCompanyLicence')
const MemberLicense     =     require('../models/OswMemberLicense')
const Helper            =     require("../helper/helper");
const md5               =     require('md5');

const create = async (req, res) => {
  // #swagger.tags = ['Company']
  /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["company_name","employee_count","street","country","state","telephone","postal_code"], 
        "properties": { 
          "company_name": { 
            "type": "string",
          },
          "employee_count": { 
            "type": "string",
          },
          "street": { 
            "type": "string",
          },
          "country": { 
            "type": "string",
          },
          "state": { 
            "type": "string",
          },
          "postal_code": { 
            "type": "string",
          },
          "telephone": { 
            "type": "string",
          },
          "fax": { 
            "type": "string",
          },
          "logo": { 
            "type": "string",
          },
          "sector": { 
            "type": "string",
          },
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
          "user_name": { 
            "type": "string",
          },
          "password": { 
            "type": "string",
          },
          "ssb_license": { 
            "type": "string",
          },
          "pd_license": { 
            "type": "string",
          },
          "add_date": { 
            "type": "string",
          },
          "add_description": { 
            "type": "string",
          },
        } 
      } 
    }
  */
  try{
      // Create a user   
      const {user_name,password } = req.body
      const check = await User.findOne({ where: { user_name } });
      if (check) {
        return await Helper.ErrorValidation(req,res,{ error: 'User already exists with given username.'})
      }
      const hashedPassword = md5(password);
      const user = await User.create({user_name,pwd:hashedPassword,user_type:1})
      
      // Create a Company
      req.body['user_id'] = user.user_id;
      req.body['fax'] = req.body.fax || '';
      req.body['logo'] = req.body.logo || '';
      const company = await ThisModel.create(req.body)
      
      // Create a Administrator
      req.body['list_of_companies'] = company.company_id;
      req.body['admintype'] = 'ASA';
      req.body['is_primary'] = 1;
      delete req.body.fax
      delete req.body.password
      await Administrator.create(req.body)

      // Create a Company Licence
      req.body['company_id'] = company.company_id;
      await CompanyLicence.create(req.body)
      
      return await Helper.SuccessValidation(req,res,company)
  }catch (err){
      console.error('Error creating a company:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')
  }
}


const list = async (req, res) => {
    // #swagger.tags = ['Company']
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
    // #swagger.tags = ['Company']
    let query={}
    query['where'] = {}
    let record = await ThisModel.findByPk(req.params.company_id,query);
    if(!record){
      return await Helper.ErrorValidation(req,res,{message:"record not found!"})
    }
    return await Helper.SuccessValidation(req,res,record)
}

const update = async (req, res) => {
    // #swagger.tags = ['Company']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": [], 
        "properties": { 
          "company_name": { 
            "type": "string",
          },
          "employee_count": { 
            "type": "string",
          },
          "street": { 
            "type": "string",
          },
          "country": { 
            "type": "string",
          },
          "state": { 
            "type": "string",
          },
          "postal_code": { 
            "type": "string",
          },
          "telephone": { 
            "type": "string",
          },
          "fax": { 
            "type": "string",
          },
          "logo": { 
            "type": "string",
          },
          "sector": { 
            "type": "string",
          },
          "is_deleted": { 
            "type": "string",
          },
        } 
      } 
    }
  */
    
    let Allrecords = await ThisModel.count({where:{company_id :req.params.company_id }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{company_id :req.params.company_id }}).then(async(record) => {
        record = await ThisModel.findByPk(req.params.company_id );
        return await Helper.SuccessValidation(req,res,record,'Updated successfully')
      }).catch( async (err) => {
        return await Helper.ErrorValidation(req,res,err,'cache')
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'Sector with this id not found'},'cache')
    }
}

const updateBulk = async (req, res) => {
  // #swagger.tags = ['Company']
  /*
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "type": "array",
        "items": {
          "properties": {
            "company_id": {
              "type": "integer",
              "description": "ID of the company to update"
            },
            "company_name": { 
              "type": "string",
            },
            "employee_count": { 
              "type": "string",
            },
            "street": { 
              "type": "string",
            },
            "country": { 
              "type": "string",
            },
            "state": { 
              "type": "string",
            },
            "postal_code": { 
              "type": "string",
            },
            "telephone": { 
              "type": "string",
            },
            "fax": { 
              "type": "string",
            },
            "logo": { 
              "type": "string",
            },
            "sector": { 
              "type": "string",
            },
            "is_deleted": { 
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
      const { company_id, reason, action_msg, ...data } = update;
      const recordExists = await ThisModel.count({ where: { company_id } });

      if (recordExists > 0) {
        await ThisModel.update(data, { where: { company_id } });
      } else {
        return await Helper.ErrorValidation(req, res, { message: `Company with id ${company_id} not found` }, 'cache');
      }
    }
    return await Helper.SuccessValidation(req, res,{ message:'Bulk update successful'});
  } catch (error) {
    console.error('Error during bulk update:', error);
    return await Helper.ErrorValidation(req, res, error, 'cache');
  }
};

const remove = async (req, res) => {
    // #swagger.tags = [ 'Company']
    try{
        let record = await ThisModel.destroy({where:{company_id :req.params.company_id }})
        return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
    } catch (err) {
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
}

const bulkremove = async (req, res) => {
  // #swagger.tags = ['Company']
    let theArray = req.params.company_id  
    if(!Array.isArray(theArray)){theArray = theArray.split(",");}
    for (let index = 0; index < theArray.length; ++index) {
      const rowid = theArray[index];
      await ThisModel.destroy({where:{company_id :rowid}}).then((response) => {}).catch((err) => {});
    }
    return await Helper.SuccessValidation(req,res,[],"Deleted successfully")
}

const exportCSV = async (req, res) => {
  // #swagger.tags = ['Company']
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
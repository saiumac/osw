const ThisModel         =     require('../models/OswSection1Answered')
const Question          =     require('../models/Question')
const bcrypt            =     require('bcrypt');
const jwt               =     require('jsonwebtoken');
const crypto            =     require('crypto');
const nodemailer        =     require('nodemailer')
const Helper            =     require("../helper/helper");



const list = async (req, res) => {
  // #swagger.tags = ['QAs']
  // #swagger.parameters['pageSize'] = {in: 'query',type:'number'}
  // #swagger.parameters['page'] = {in: 'query',type:'number'}
  try {
    let pageSize = 0;
    let skip = 0;
    let query={}
    query['where'] = {}
    query["attributes"] = {exclude:["createdAt", "updatedAt"]},
    query['include'] = {
      model:Model.QuestionSet,
      attributes:{exclude:["createdAt", "updatedAt"]},
      include:{
        model:Model.Answer,
        attributes:{exclude:["createdAt", "updatedAt"]},
      }
    }
    if(req.query.page && req.query.pageSize){
    if(req.query.page >= 0 && req.query.pageSize > 0){
        pageSize = req.query.pageSize;
        skip = req.query.page * req.query.pageSize;
    }
    query['offset'] = parseInt(skip)
    query['limit'] = parseInt(pageSize)
    }
    // query['order'] = [['user_id', 'DESC']]
    const records = await Question.findAndCountAll(query);
    res.status(200).json(records);
  } catch (error) {
      console.error('Error retrieving records:', error);
      res.status(500).json({ error: 'Failed to retrieve records.',error:error.message });
  }
};



const get = async (req, res) => {
    // #swagger.tags = ['QAs']
    try {
      const answers = await ThisModel.findOne({where:{user_id:req.user.userId}})
      return await Helper.SuccessValidation(req,res,answers)
    } catch (err) {
      return await Helper.ErrorValidation(req,res,err,'cache')
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['QAs']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "properties": {
            "question1": {
              "type": "string"
            },
            "question2": {
              "type": "string"
            },
            "question3": {
              "type": "string"
            },
            "question4": {
              "type": "string"
            },
            "question5": {
              "type": "string"
            },
            "question6": {
              "type": "string"
            },
            "question7": {
              "type": "string"
            },
            "question8": {
              "type": "string"
            },
            "question9": {
              "type": "string"
            },
            "question10": {
              "type": "string"
            },
            "question11": {
              "type": "string"
            },
            "question12": {
              "type": "string"
            },
            "question13": {
              "type": "string"
            },
            "question14": {
              "type": "string"
            },
            "question15": {
              "type": "string"
            },
            "question16": {
              "type": "string"
            },
            "question17": {
              "type": "string"
            },
            "question18": {
              "type": "string"
            },
            "question19": {
              "type": "string"
            },
            "question20": {
              "type": "string"
            },
            "question21": {
              "type": "string"
            },
            "question22": {
              "type": "string"
            },
            "question23": {
              "type": "string"
            },
            "question24": {
              "type": "string"
            },
            "question25": {
              "type": "string"
            },
            "question26": {
              "type": "string"
            },
            "question27": {
              "type": "string"
            },
            "question28": {
              "type": "string"
            },
            "question29": {
              "type": "string"
            },
            "question30": {
              "type": "string"
            },
            "question31": {
              "type": "string"
            },
            "question32": {
              "type": "string"
            },
            "question33": {
              "type": "string"
            },
            "question34": {
              "type": "string"
            },
            "question35": {
              "type": "string"
            },
            "question36": {
              "type": "string"
            },
            "question37": {
              "type": "string"
            },
            "question38": {
              "type": "string"
            },
            "question39": {
              "type": "string"
            },
            "question40": {
              "type": "string"
            },
            "question41": {
              "type": "string"
            },
            "question42": {
              "type": "string"
            },
            "question43": {
              "type": "string"
            },
            "question44": {
              "type": "string"
            },
            "question45": {
              "type": "string"
            },
          }
        } 
      }
    */     
    let Allrecords = await ThisModel.count({where:{user_id :req.user.userId }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{user_id :req.user.userId }}).then(async(records) => {
        const record = await ThisModel.findOne({where:{user_id :req.user.userId}});
        const nonEmptyAnswersCount = Object.keys(record.toJSON()).filter(key => {
          return key.startsWith('question') && record[key] !== '';
        }).length;
        record.total_questions_answered = nonEmptyAnswersCount
        record.save()
        return res.status(201).json({ message : 'user updated succefully.', record})
      }).catch( async (err) => {
        return res.status(500).json({ error: 'Failed to updating user.',error:err.message });
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'user with this id not found'},'cache')
    }
};

module.exports = {get,update, list};
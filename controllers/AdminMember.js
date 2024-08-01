const ThisModel         =     require('../models/OswMember')
const User              =     require('../models/User')
const Administrator     =     require('../models/OswAdministrator')
const LicenseDetail     =     require('../models/OswLicenseDetail')
const MemberLicense     =     require('../models/OswMemberLicense')
const Section1Answered  =     require('../models/OswSection1Answered')
const nodemailer        =     require('nodemailer')
const Helper            =     require("../helper/helper");
const md5               =     require('md5');


const create = async (req, res) => {
    // #swagger.tags = ['AdminMembers']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["first_name","last_name","email","user_name","password"], 
        "properties": { 
          "first_name": { 
            "type": "string",
          },
          "last_name": { 
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
          "profile_visible": { 
            "type": "string",
          },
          "license_type": { 
            "type": "string",
            "description":"1=> SSB, 2=> PD, 3=> Old"
          },
          "message": { 
            "type": "string",
          },
        } 
      } 
    }
  */
    try{
      // admin
      const admin = await Administrator.findOne({where:{user_id:req.user.userId}});
      const checkLicence = LicenseDetail.findAll({
        where: {
          company_id: admin.list_of_companies,
          license_type: req.body.license_type,
          status: 0
        },
        limit: 1
      });
      if(checkLicence.length > 0){
        const { user_name,password } = req.body
        const check = await User.findOne({ where: { user_name } });
        if (check) {
          return res.status(400).json({ error: 'User already exists with given username.' });
        }
        // Create a user   
        const hashedPassword = md5(password);
        const user = await User.create({user_name,pwd:hashedPassword})
        
        // Create a member
        req.body['user_id'] = user.user_id;
        req.body['company_id'] = admin.list_of_companies;
        req.body['administrator_id'] = admin.administrator_id;
        req.body['is_search'] = 0;
        const member = await ThisModel.create(req.body)
        await Section1Answered.create(req.body)

        // Create Member Licence
        req.body['member_id'] = member.member_id;
        req.body['license_id'] = checkLicence[0].license_id;
        await MemberLicense.create(req.body)
        // update Licence Status
        await LicenseDetail.update({status:1},{where:{license_id :checkLicence[0].license_id }})
        let result = {user,member}
        return await Helper.SuccessValidation(req,res,result)
      }else{
        return await Helper.ErrorValidation(req,res,{message:"No Licence Found!"},'cache')    
      }
    }catch (err){
      console.error('Error adding member:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')    
    }
}


const getCurrentuser = async (req, res) => {
    // #swagger.tags = ['AdminMembers']
    try {
      console.log("MemberID", req.user.member_id);
        const member = await ThisModel.findByPk(req.user.member_id)
        return await Helper.SuccessValidation(req,res,member)
    } catch (error) {
        console.error('Error retrieving user:', error);
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
};

const Update = async (req, res) => {
    // #swagger.tags = ['AdminMembers']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "properties": { 
            "first_name": { 
              "type": "string",
            },
            "last_name": { 
              "type": "string",
            },
            "email": { 
              "type": "string",
            },
            "member_age": { 
              "type": "string",
            },
            "member_mobile": { 
              "type": "string",
            },
            "member_gender": { 
              "type": "string",
            },
            "member_education": { 
              "type": "string",
            },
            "member_ocupation": { 
              "type": "string",
            },
            "member_industry": { 
              "type": "string",
            },
            "job_category": { 
              "type": "string",
            },
            "is_deleted": { 
              "type": "string",
            },
          } 
        } 
      }
    */     
    let Allrecords = await ThisModel.count({where:{member_id :req.params.member_id }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{member_id :req.params.member_id }}).then(async(records) => {
        const record = await ThisModel.findOne({where:{member_id :req.params.member_id}});
        return res.status(201).json({ message : 'member updated succefully.', record})
      }).catch( async (err) => {
        return res.status(500).json({ error: 'Failed to updating user.',error:err.message });
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'user with this id not found'},'cache')
    }
};


const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587, 
  secure: false,
  auth: {
    user: 'momsfood262@gmail.com',
    pass: '9XknBbM2RQIS8NTJ',
  },
});

const ForgotPassword =  async (req, res) => {
    // #swagger.tags = ['AdminMembers']
    /*
    #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["email"],
            "properties": { 
                "email": { 
                    "type": "string",
                }
            } 
        } 
    }
    */
    try {
        let email = req.body.email;
        const user = await ThisModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'user not found.' });
        }
        const randomPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        user.password = hashedPassword;
        await user.save();
        // Send the random password to the user's registered email address
        const mailOptions = {
                from: 'swagruhafood262@gmail.com',
                to: email,
                subject: 'Forgot Password',
                html: `Your new password is: ${randomPassword}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error sending new password email:', error);
                  // res.status(500).json({ error: 'Failed to send new password email.' });
                }else{
                  console.log('New password email sent:', info.response);
                  res.status(200).json({ message: 'New password sent successfully. Check your email.' });
                }
        });
        res.status(200).json({ message: 'New password sent successfully. Check your email.',new_password:randomPassword });
    } catch (error) {
      console.error('Error sending new password:', error);
      res.status(500).json({ error: 'Failed to send new password.', error:error.message });
    }
};
  
// Change Password API
const ChangePassword = async (req, res) => {
    // #swagger.tags = ['AdminMembers']
    /*
    #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["currentPassword","newPassword","confirmPassword"],
            "properties": { 
                "currentPassword": { 
                    "type": "string",
                },
                "newPassword": { 
                    "type": "string",
                },
                "confirmPassword": { 
                    "type": "string",
                }
            } 
        } 
    }
    */
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await ThisModel.findByPk(req.user.userId);
         if (!user) {
            return res.status(204).json({ error: 'user not found.' });
        }
        if (!currentPassword || typeof currentPassword !== 'string') {
            return res.status(400).json({ error: 'Current password is missing or invalid.' });
        }
 
        const hashedPass = md5(currentPassword); // Hash the password
        if (hashedPass !== user.password) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).json({ error: 'New password and confirm password do not match.' });
        }

        const hashedPassword = md5(newPassword); 
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password.', error:error.message });
    }
};


const list = async (req, res) => {
  // #swagger.tags = ['AdminMembers']
  // #swagger.parameters['pageSize'] = {in: 'query',type:'number'}
  // #swagger.parameters['page'] = {in: 'query',type:'number'}
  try {
    let pageSize = 0;
    let skip = 0;
    let query={}
    query['where'] = {}
    const admin = await Administrator.findOne({where:{user_id:req.user.userId}});
    query['where']['company_id']  = admin.list_of_companies;
    // query['include'] = {
    //   model:Model.Role,
    //   attributes:["name"]
    // }
    if(req.query.page && req.query.pageSize){
    if(req.query.page >= 0 && req.query.pageSize > 0){
        pageSize = req.query.pageSize;
        skip = req.query.page * req.query.pageSize;
    }
    query['offset'] = parseInt(skip)
    query['limit'] = parseInt(pageSize)
    }
    const records = await ThisModel.findAndCountAll(query);
    res.status(200).json(records);
  } catch (error) {
      console.error('Error retrieving records:', error);
      res.status(500).json({ error: 'Failed to retrieve records.',error:error.message });
  }
};

module.exports = {create,getCurrentuser,Update,ForgotPassword, ChangePassword,list,};
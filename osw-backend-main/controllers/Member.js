const ThisModel         =     require('../models/OswMember')
const User              =     require('../models/User')
const Administrator     =     require('../models/OswAdministrator')
const CompanyLicence    =     require('../models/OswCompanyLicence')
const MemberLicense     =     require('../models/OswMemberLicense')
const bcrypt            =     require('bcrypt');
const jwt               =     require('jsonwebtoken');
const crypto            =     require('crypto');
const nodemailer        =     require('nodemailer')
const Helper            =     require("../helper/helper");

const register = async (req, res) => {
    // #swagger.tags = ['Members']
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
        } 
      } 
    }
  */
    try{
        const { first_name,last_name,email,user_name,password } = req.body
        const check = await User.findOne({ where: { user_name } });
        if (check) {
            return res.status(400).json({ error: 'User already exists with given email.' });
        }
        hashedPassword = await bcrypt.hash(password, 10);
        // Create a user   
        const user = await User.create({user_name,pwd:hashedPassword})
        // Create a member
        req.body['user_id'] = user.user_id;
        req.body['crdate'] = Helper.CurrentDate();
        req.body['company_id'] = '';
        req.body['is_search'] = 0;
        req.body['license_type'] = 2;
        req.body['message'] = "Welcome to Your 4D-i. The 4D-i is an inventory of how you like to think and work. It is not a test. All items are equally correct and there are no right or wrong answers. The 4D-i will give you a clear, easy to understand profile of the thinking strategies you like to use to deal with challenges, solve problems and work with others."
        const member = await ThisModel.create(req.body)
        await Section1Answered.create(req.body)
        let result = {
          user,
          member
        }
        res.status(201).json({message:"registrations succefully!", result});
    }catch (error){
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user.',error:error.message });
    }
}

const login = async (req, res) => {
    // #swagger.tags = ['Members']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "properties": { 
          "user_name": { 
            "type": "string",
          },
          "password": { 
            "type": "string",
          }
        } 
      } 
    }
  */
    try {
      const { user_name, password } = req.body;
      let logquery = {}
      logquery['where'] = {}
      logquery['where']['user_name'] = user_name;
      const user = await User.findOne(logquery);
      if (!user) {
        return res.status(401).json({ error: "Invalid username." });
      }
      member = await ThisModel.findOne({where:{user_id: user.user_id}});
      const isPasswordValid = await bcrypt.compare(password, user.pwd);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password.' });
      }
      const token = jwt.sign({ userId: user.user_id, member_id: member.member_id }, "Fdi-OSW@2k24", {expiresIn: "2D",});
      
      res.status(201).json({ message: "Login success", token,user });
    } catch (err) {
      console.error('Error logging in:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')    }
};



const getCurrentuser = async (req, res) => {
    // #swagger.tags = ['Members']
    try {
      console.log("UserID", req.user.userId);
      console.log("MemberID", req.user.member_id);
        const member = await ThisModel.findByPk(req.user.member_id)
        return await Helper.SuccessValidation(req,res,member)
    } catch (error) {
        console.error('Error retrieving user:', error);
        return await Helper.ErrorValidation(req,res,err,'cache')
    }
};

const Update = async (req, res) => {
    // #swagger.tags = ['Members']
    /*
      #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "properties": { 
            "username": { 
              "type": "string",
            },
            "phone": { 
              "type": "string",
            },
            "is_active": { 
              "type": "string",
            },
            "role_id": { 
              "type": "number",
            },
          } 
        } 
      }
    */     
    let Allrecords = await ThisModel.count({where:{user_id :req.user.userId }});
    if(Allrecords>0){
      return await ThisModel.update(req.body,{where:{user_id :req.user.userId }}).then(async(records) => {
        const record = await ThisModel.findOne({where:{user_id :req.user.userId}});
        return res.status(201).json({ message : 'user updated succefully.', record})
      }).catch( async (err) => {
        return res.status(500).json({ error: 'Failed to updating user.',error:err.message });
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'user with this id not found'},'cache')
    }
};


const Delete = async (req, res) => {
    // #swagger.tags = ['Members']
    // #swagger.parameters['user_id'] = { description: 'Enter user_id',type: 'number',required: true,}
    try {
        const user = await ThisModel.findByPk(req.params.user_id);
        if (!user) {
            return res.status(404).json({ error: 'user not found.' });
        }
        await user.destroy();
        res.status(204).json({message:'user was deleted!'});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user.',error:error.message });
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
    // #swagger.tags = ['Members']
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
    // #swagger.tags = ['Members']
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
  // #swagger.tags = ['Members']
  // #swagger.parameters['pageSize'] = {in: 'query',type:'number'}
  // #swagger.parameters['page'] = {in: 'query',type:'number'}
  try {
    let pageSize = 0;
    let skip = 0;
    let query={}
    query['where'] = {}
    if (req.query.role_id) {
      query['where']['role_id']  = req.query.role_id;
    }
    if (req.query.company_id) {
      query['where']['company_id']  = req.query.company_id;
    }
    query['include'] = {
      model:Model.Role,
      attributes:["name"]
    }
    if(req.query.page && req.query.pageSize){
    if(req.query.page >= 0 && req.query.pageSize > 0){
        pageSize = req.query.pageSize;
        skip = req.query.page * req.query.pageSize;
    }
    query['offset'] = parseInt(skip)
    query['limit'] = parseInt(pageSize)
    }
    query['order'] = [['user_id', 'DESC']]
    const records = await ThisModel.findAndCountAll(query);
    res.status(200).json(records);
  } catch (error) {
      console.error('Error retrieving records:', error);
      res.status(500).json({ error: 'Failed to retrieve records.',error:error.message });
  }
};

module.exports = {register,login,getCurrentuser,Update, Delete,ForgotPassword, ChangePassword,list,};
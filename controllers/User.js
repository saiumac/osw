const ThisModel         =     require('../models/User')
const User              =     require('../models/User')
const jwt               =     require('jsonwebtoken');
const nodemailer        =     require('nodemailer')
const Helper            =     require("../helper/helper");
const md5               =     require('md5');

const register = async (req, res) => {
    // #swagger.tags = ['User']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["first_name","last_name","email","user_name","password"], 
        "properties": { 
          "email": { 
            "type": "string",
          },
          "password": { 
            "type": "string",
          },
          "user_name": { 
            "type": "string",
          },
          "user_type": { 
            "type": "string",
            "description": "0=member,1=company admin,2=admin",
          },
        } 
      } 
    }
  */
    try{
        const { user_name,password } = req.body
        const check = await User.findOne({ where: { user_name } });
        if (check) {
            return res.status(400).json({ error: 'User already exists with given email.' });
        }
        // hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = md5(password);
        // Create a user   
        const user = await User.create({user_name,pwd:hashedPassword})

        return await Helper.SuccessValidation(req,req,{message:"registrations succefully!", user})        
    }catch (err){
      console.error('Error registering user:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')   
    }
}

const login = async (req, res) => {
    // #swagger.tags = ['User']
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
    user = await Model.User.findOne(logquery);
    if (!user) {
      return  await Helper.ErrorValidation(req,res,{ error: "Invalid username." });
    }
    const hashedPassword = md5(password); // Hash the password
    if (hashedPassword !== user.pwd) {
      return  await Helper.ErrorValidation(req,res,{ error: "Invalid password." });
    }
    const token = jwt.sign({ userId: user.user_id }, "Fdi-OSW@2k24", {expiresIn: "2D",});
    return  await Helper.SuccessValidation(req,res,{token,user});
  } catch (err) {
    console.error('Error logging in:', err);
    return await Helper.ErrorValidation(req,res,err,'cache')   
  }
};



const getCurrentuser = async (req, res) => {
    // #swagger.tags = ['User']
    try {
      const user = await ThisModel.findByPk(req.user.userId)
      return await Helper.SuccessValidation(req,res,user)
    } catch (error) {
      console.error('Error retrieving user:', error);
      return await Helper.ErrorValidation(req,res,err,'cache')
    }
};

const Update = async (req, res) => {
    // #swagger.tags = ['User']
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
        return await Helper.SuccessValidation(req,res,record)
      }).catch( async (err) => {
        return await Helper.ErrorValidation(req,res,err,'cache')   
      })
    }else{
      return await Helper.ErrorValidation(req,res,{message:'user with this id not found'},'cache')
    }
};


const Delete = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.parameters['user_id'] = { description: 'Enter user_id',type: 'number',required: true,}
    try {
        const user = await ThisModel.findByPk(req.params.user_id);
        if (!user) {
          return  await Helper.ErrorValidation(req,res,{ error: "user not found." });
        }
        await user.destroy();
        return await Helper.SuccessValidation(req,res,{message:'user was deleted!'})
    } catch (err) {
      console.error('Error deleting user:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')   
    }
};


const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587, 
  secure: false,
  auth: {
    user: 'fdi-osw@gmail.com',
    pass: '9XknBbM2RQIS8NTJ',
  },
});

const ForgotPassword =  async (req, res) => {
    // #swagger.tags = ['User']
    /*
    #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["user_name"],
            "properties": { 
                "user_name": { 
                    "type": "string",
                }
            } 
        } 
    }
    */
    try {
      let user_name = req.body.user_name;
      const user = await ThisModel.findOne({ where: { user_name } });
      if (!user) {
        return await Helper.ErrorValidation(req,res,{ error: "user not found." });
      }
      // const randomPassword = crypto.randomBytes(8).toString('hex');
      // const hashedPassword = await bcrypt.hash(randomPassword, 10);
      const hashedPassword = md5(password);
      user.password = hashedPassword;
      await user.save();
      // Send the random password to the user's registered email address
      const mailOptions = {
              from: 'osw@gmail.com',
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
                // res.status(200).json({ message: 'New password sent successfully. Check your email.' });
              }
      });
      return await Helper.SuccessValidation(req,res,{ message: 'New password sent successfully. Check your email.',new_password:randomPassword })
    } catch (err) {
      console.error('Error sending new password:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')   
    }
};
  
  // Change Password API
  const ChangePassword = async (req, res) => {
    // #swagger.tags = ['User']
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
        return await Helper.ErrorValidation(req,res,{ error: "user not found." });
      }
      if (!currentPassword || typeof currentPassword !== 'string') {
        return await Helper.ErrorValidation(req,res,{ error: "Current password is missing or invalid." });
      }

      const hashedPass = md5(currentPassword); // Hash the password
      if (hashedPass !== user.password) {
        return await Helper.ErrorValidation(req,res,{ error: "Current password is incorrect." });
      }

      if (newPassword !== confirmPassword) {
        return await Helper.ErrorValidation(req,res,{ error: "New password and confirm password do not match." });
      }

      const hashedPassword = md5(newPassword); 
      user.password = hashedPassword;
      await user.save();
      return await Helper.SuccessValidation(req,res,{ message: 'Password changed successfully.'})
    } catch (err) {
      console.error('Error changing password:', err);
      return await Helper.ErrorValidation(req,res,err,'cache')   
    }
};


const list = async (req, res) => {
  // #swagger.tags = ['User']
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
    return await Helper.SuccessValidation(req,res,records)
  } catch (err) {
    console.error('Error retrieving records:', err);
    return await Helper.ErrorValidation(req,res,err,'cache')   
  }
};

module.exports = {register,login,getCurrentuser,Update, Delete,ForgotPassword, ChangePassword,list,};
const expres                    =   require('express');
const router                    =   expres.Router();
const { authenticationToken }         =   require('../helper/Middleware.js')
const upload                    =   require('../helper/FileUploder.js')



const CommonController           =  require('../controllers/Common.js')
router.get("/Check/Server",CommonController.Check)
router.post("/Common/Upload", upload.array('files', 5),CommonController.Upload)

const UserController          =  require('../controllers/User.js')
router.post("/User/register", UserController.register)
router.post("/User/login", UserController.login)
router.post("/User/forgot_password", UserController.ForgotPassword)
router.post("/User/change_password",authenticationToken, UserController.ChangePassword)

const MemberController          =  require('../controllers/Member.js')
router.post("/Member/register", MemberController.register)
router.post("/Member/login", MemberController.login)
router.get("/Member/details", authenticationToken, MemberController.getCurrentuser)


const QAController          =  require('../controllers/QA.js')
router.post("/QA/Questions/list", authenticationToken, QAController.list)
router.post("/QA/list", authenticationToken, QAController.get)
router.post("/QA/update", authenticationToken, QAController.update)

//Super Admin APIs
const CompanySectorController          =  require('../controllers/CompanySector.js')
router.post("/CompanySector/create",authenticationToken,CompanySectorController.create)
router.get("/CompanySector/list",authenticationToken,CompanySectorController.list)
router.get("/CompanySector/view/:id",authenticationToken, CompanySectorController.view)
router.patch("/CompanySector/update/:id",authenticationToken, CompanySectorController.update)
router.delete("/CompanySector/delete/:id",authenticationToken, CompanySectorController.remove)

const CompanyController          =  require('../controllers/Company.js')
router.post("/Company/create",authenticationToken,CompanyController.create)
router.get("/Company/list",authenticationToken,CompanyController.list)
router.get("/Company/view/:id",authenticationToken, CompanyController.view)
router.patch("/Company/update/:id",authenticationToken, CompanyController.update)
router.delete("/Company/delete/:id",authenticationToken, CompanyController.remove)

const AdministratorController          =  require('../controllers/Administrator.js')
router.post("/Administrator/create",authenticationToken,AdministratorController.create)
router.get("/Administrator/list",authenticationToken,AdministratorController.list)
router.get("/Administrator/view/:administrator_id",authenticationToken, AdministratorController.view)
router.patch("/Administrator/update/:administrator_id",authenticationToken, AdministratorController.update)
router.delete("/Administrator/delete/:administrator_id",authenticationToken, AdministratorController.remove)

const ResourceController          =  require('../controllers/Resource.js')
router.post("/Resource/create",authenticationToken,ResourceController.create)
router.get("/Resource/list",authenticationToken,ResourceController.list)
router.get("/Resource/view/:resource_id",authenticationToken, ResourceController.view)
router.patch("/Resource/update/:resource_id",authenticationToken, ResourceController.update)
router.delete("/Resource/delete/:resource_id",authenticationToken, ResourceController.remove)

const FavouriteController          =  require('../controllers/Favourite.js')
router.post("/Favourite/create",authenticationToken,FavouriteController.create)
router.get("/Favourite/list",FavouriteController.list)
router.get("/Favourite/view/:fav_id",authenticationToken, FavouriteController.view)
router.patch("/Favourite/update/:fav_id",authenticationToken, FavouriteController.update)
router.delete("/Favourite/delete/:fav_id",authenticationToken, FavouriteController.remove)

// Admin APIs
const AdminMemberController          =  require('../controllers/AdminMember.js')
router.post("/AdminMember/create", authenticationToken, AdminMemberController.create)
router.get("/AdminMember/list", authenticationToken, AdminMemberController.list)
router.patch("/AdminMember/update/:member_id", authenticationToken, AdminMemberController.Update)

const GroupController          =  require('../controllers/Group.js')
router.post("/Group/create", authenticationToken, GroupController.create)
router.get("/Group/list", authenticationToken, GroupController.list)
router.get("/Group/view/:group_id",authenticationToken, GroupController.view)
router.patch("/Group/update/:group_id", authenticationToken, GroupController.update)

const AdminController          =  require('../controllers/AdminAdministrator.js')
router.post("/Admin/create", authenticationToken, AdminController.create)
router.get("/Admin/list", authenticationToken, AdminController.list)
router.get("/Admin/view/:administrator_id",authenticationToken, AdminController.view)
router.patch("/Admin/update/:administrator_id", authenticationToken, AdminController.update)

// Error handler for wrong path
router.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found, please check the URL' });
});

module.exports = router;
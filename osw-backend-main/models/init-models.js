const DataTypes = require("sequelize").DataTypes;
const _Answer = require("./Answer");
const _Appraise = require("./Appraise");
const _Aspect = require("./Aspect");
const _AspectsForSectionB = require("./AspectsForSectionB");
const _CoachingTip = require("./CoachingTip");
const _CoachingTipsForClient = require("./CoachingTipsForClient");
const _CoachingTipsForClient1 = require("./CoachingTipsForClient1");
const _IpHistory = require("./IpHistory");
const _IssueSupportAdmin = require("./IssueSupportAdmin");
const _OswAdministrator = require("./OswAdministrator");
const _OswAdministratorGroup = require("./OswAdministratorGroup");
const _OswCompany = require("./OswCompany");
const _OswCompanyLicence = require("./OswCompanyLicence");
const _OswCompanySector = require("./OswCompanySector");
const _OswCoolWarmCount = require("./OswCoolWarmCount");
const _OswDiscountCoupon = require("./OswDiscountCoupon");
const _OswFavMem = require("./OswFavMem");
const _OswFavourite = require("./OswFavourite");
const _OswGroup = require("./OswGroup");
const _OswIssueAttachment = require("./OswIssueAttachment");
const _OswIssueStatus = require("./OswIssueStatus");
const _OswIssueType = require("./OswIssueType");
const _OswIssue = require("./OswIssue");
const _OswLicenseDefaultPrice = require("./OswLicenseDefaultPrice");
const _OswLicenseDetail = require("./OswLicenseDetail");
const _OswLicenseOrder = require("./OswLicenseOrder");
const _OswMemberDimension = require("./OswMemberDimension");
const _OswMemberGroup = require("./OswMemberGroup");
const _OswMemberLicense = require("./OswMemberLicense");
const _OswMemberMindset = require("./OswMemberMindset");
const _OswMemberOrder = require("./OswMemberOrder");
const _OswMemberStrategy = require("./OswMemberStrategy");
const _OswMember = require("./OswMember");
const _OswPersonalDevelopmentTip = require("./OswPersonalDevelopmentTip");
const _OswResource = require("./OswResource");
const _OswResourcesNew = require("./OswResourcesNew");
const _OswSection1Answered = require("./OswSection1Answered");
const _OswSection1Score = require("./OswSection1Score");
const _OswSection2Answered = require("./OswSection2Answered");
const _OswStrategy = require("./OswStrategy");
const _OswSubscribeEmail = require("./OswSubscribeEmail");
const _ProfileResult = require("./ProfileResult");
const _QuestionSet = require("./QuestionSet");
const _Question = require("./Question");
const _ResultSummary = require("./ResultSummary");
const _ScoreLevel = require("./ScoreLevel");
const _State = require("./State");
const _User = require("./User");
const _ZscoresPercentile = require("./ZscoresPercentile");

function initModels(sequelize) {
  const Answer = _Answer(sequelize, DataTypes);
  const Appraise = _Appraise(sequelize, DataTypes);
  const Aspect = _Aspect(sequelize, DataTypes);
  const AspectsForSectionB = _AspectsForSectionB(sequelize, DataTypes);
  const CoachingTip = _CoachingTip(sequelize, DataTypes);
  const CoachingTipsForClient = _CoachingTipsForClient(sequelize, DataTypes);
  const CoachingTipsForClient1 = _CoachingTipsForClient1(sequelize, DataTypes);
  const IpHistory = _IpHistory(sequelize, DataTypes);
  const IssueSupportAdmin = _IssueSupportAdmin(sequelize, DataTypes);
  const OswAdministrator = _OswAdministrator(sequelize, DataTypes);
  const OswAdministratorGroup = _OswAdministratorGroup(sequelize, DataTypes);
  const OswCompany = _OswCompany(sequelize, DataTypes);
  const OswCompanyLicence = _OswCompanyLicence(sequelize, DataTypes);
  const OswCompanySector = _OswCompanySector(sequelize, DataTypes);
  const OswCoolWarmCount = _OswCoolWarmCount(sequelize, DataTypes);
  const OswDiscountCoupon = _OswDiscountCoupon(sequelize, DataTypes);
  const OswFavMem = _OswFavMem(sequelize, DataTypes);
  const OswFavourite = _OswFavourite(sequelize, DataTypes);
  const OswGroup = _OswGroup(sequelize, DataTypes);
  const OswIssueAttachment = _OswIssueAttachment(sequelize, DataTypes);
  const OswIssueStatus = _OswIssueStatus(sequelize, DataTypes);
  const OswIssueType = _OswIssueType(sequelize, DataTypes);
  const OswIssue = _OswIssue(sequelize, DataTypes);
  const OswLicenseDefaultPrice = _OswLicenseDefaultPrice(sequelize, DataTypes);
  const OswLicenseDetail = _OswLicenseDetail(sequelize, DataTypes);
  const OswLicenseOrder = _OswLicenseOrder(sequelize, DataTypes);
  const OswMemberDimension = _OswMemberDimension(sequelize, DataTypes);
  const OswMemberGroup = _OswMemberGroup(sequelize, DataTypes);
  const OswMemberLicense = _OswMemberLicense(sequelize, DataTypes);
  const OswMemberMindset = _OswMemberMindset(sequelize, DataTypes);
  const OswMemberOrder = _OswMemberOrder(sequelize, DataTypes);
  const OswMemberStrategy = _OswMemberStrategy(sequelize, DataTypes);
  const OswMember = _OswMember(sequelize, DataTypes);
  const OswPersonalDevelopmentTip = _OswPersonalDevelopmentTip(sequelize, DataTypes);
  const OswResource = _OswResource(sequelize, DataTypes);
  const OswResourcesNew = _OswResourcesNew(sequelize, DataTypes);
  const OswSection1Answered = _OswSection1Answered(sequelize, DataTypes);
  const OswSection1Score = _OswSection1Score(sequelize, DataTypes);
  const OswSection2Answered = _OswSection2Answered(sequelize, DataTypes);
  const OswStrategy = _OswStrategy(sequelize, DataTypes);
  const OswSubscribeEmail = _OswSubscribeEmail(sequelize, DataTypes);
  const ProfileResult = _ProfileResult(sequelize, DataTypes);
  const QuestionSet = _QuestionSet(sequelize, DataTypes);
  const Question = _Question(sequelize, DataTypes);
  const ResultSummary = _ResultSummary(sequelize, DataTypes);
  const ScoreLevel = _ScoreLevel(sequelize, DataTypes);
  const State = _State(sequelize, DataTypes);
  const User = _User(sequelize, DataTypes);
  const ZscoresPercentile = _ZscoresPercentile(sequelize, DataTypes);

  OswMemberGroup.belongsTo(OswGroup, { foreignKey: "group_id"});
  OswGroup.hasMany(OswMemberGroup, { foreignKey: "group_id"});
  OswMemberGroup.belongsTo(OswMember, { foreignKey: "member_id"});
  OswMember.hasMany(OswMemberGroup, { foreignKey: "member_id"});
  Answer.belongsTo(QuestionSet, { foreignKey: "set_id"});
  QuestionSet.hasMany(Answer, { foreignKey: "set_id"});
  QuestionSet.belongsTo(Question, { foreignKey: "question_id"});
  Question.hasMany(QuestionSet, { foreignKey: "question_id"});
  OswAdministrator.belongsTo(User, { foreignKey: "user_id"});
  User.hasMany(OswAdministrator, { foreignKey: "user_id"});
  OswCompany.belongsTo(User, { foreignKey: "user_id"});
  User.hasMany(OswCompany, { foreignKey: "user_id"});
  OswMember.belongsTo(User, { foreignKey: "user_id"});
  User.hasMany(OswMember, { foreignKey: "user_id"});

  OswAdministrator.belongsTo(OswCompany, { as:"Company", foreignKey: "list_of_companies"});
  OswCompany.hasMany(OswAdministrator, { as:"Company", foreignKey: "list_of_companies"});

  return {
    Answer,
    Appraise,
    Aspect,
    AspectsForSectionB,
    CoachingTip,
    CoachingTipsForClient,
    CoachingTipsForClient1,
    IpHistory,
    IssueSupportAdmin,
    OswAdministrator,
    OswAdministratorGroup,
    OswCompany,
    OswCompanyLicence,
    OswCompanySector,
    OswCoolWarmCount,
    OswDiscountCoupon,
    OswFavMem,
    OswFavourite,
    OswGroup,
    OswIssueAttachment,
    OswIssueStatus,
    OswIssueType,
    OswIssue,
    OswLicenseDefaultPrice,
    OswLicenseDetail,
    OswLicenseOrder,
    OswMemberDimension,
    OswMemberGroup,
    OswMemberLicense,
    OswMemberMindset,
    OswMemberOrder,
    OswMemberStrategy,
    OswMember,
    OswPersonalDevelopmentTip,
    OswResource,
    OswResourcesNew,
    OswSection1Answered,
    OswSection1Score,
    OswSection2Answered,
    OswStrategy,
    OswSubscribeEmail,
    ProfileResult,
    QuestionSet,
    Question,
    ResultSummary,
    ScoreLevel,
    State,
    User,
    ZscoresPercentile,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

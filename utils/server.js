//本地
// const base_url = "http://localhost:8080";
//生产
const base_url = "https://www.young666.cn";

// const open_news = "https://www.apiopen.top/journalismApi";

const open_ones = "https://one.mssnn.cn";

//接口
const user_register = base_url + "/api/meetoo/user/register.do";
const user_access = base_url + "/api/meetoo/user/access.do";
const user_login = base_url + "/api/meetoo/user/login.do";
const user_getUserInfo = base_url + "/api/meetoo/user/getUserInfo.do";
const user_selectUserStatistic = base_url + "/api/meetoo/user/selectUserStatistic.do";
const user_updateProfile = base_url + "/api/meetoo/user/updateProfile.do";
const user_isFan = base_url + "/api/meetoo/user/isFan.do";
const user_saveUserRelation = base_url + "/api/meetoo/user/saveUserRelation.do";
const user_deleteRelation = base_url + "/api/meetoo/user/deleteRelation.do";
const user_selectUserFollows = base_url + "/api/meetoo/user/selectUserFollows.do";
const user_selectUserFans = base_url + "/api/meetoo/user/selectUserFans.do";
const moment_publish = base_url + "/api/meetoo/moment/publish.do";
const moment_uploadPic = base_url + "/api/meetoo/moment/uploadMomentPic.do";
const moment_selectNewMoment = base_url + "/api/meetoo/moment/selectNewMoment.do";
const moment_selectHotMoment = base_url + "/api/meetoo/moment/selectHotMoment.do";
const moment_selectMomentDetail = base_url + "/api/meetoo/moment/selectMomentDetail.do";
const moment_saveMomentSee = base_url + "/api/meetoo/moment/saveMomentSee.do";
const moment_saveMomentMark = base_url + "/api/meetoo/moment/saveMomentMark.do";
const moment_saveMomentComment = base_url + "/api/meetoo/moment/saveMomentComment.do";
const moment_selectUserMoments = base_url + "/api/meetoo/moment/selectUserMoments.do";
const group_selectByType = base_url + "/api/meetoo/group/selectByType.do";
const group_selectUserGroups = base_url + "/api/meetoo/group/selectUserGroups.do";
const group_selectMineGroups = base_url + "/api/meetoo/group/selectMineGroups.do";
const group_selectGroupDetail = base_url + "/api/meetoo/group/selectGroupDetail.do";
const group_saveGroup = base_url + "/api/meetoo/group/saveGroup.do";
const group_deleteGroup = base_url + "/api/meetoo/group/deleteGroup.do";
const topic_selectByGroupId = base_url + "/api/meetoo/topic/selectByGroupId.do";
const topic_publish = base_url + "/api/meetoo/topic/publish.do";
const topic_uploadTopicPic = base_url + "/api/meetoo/topic/uploadTopicPic.do";
const topic_selectTopicDetail = base_url + "/api/meetoo/topic/selectTopicDetail.do";
const topic_saveTopicComment = base_url + "/api/meetoo/topic/saveTopicComment.do";
const topic_selectGroupMyTopic = base_url + "/api/meetoo/topic/selectGroupMyTopic.do";
const topic_deleteTopic = base_url + "/api/meetoo/topic/deleteTopic.do";

module.exports = {
  base_url: base_url,
  // open_news: open_news,
  open_ones: open_ones,
  user_register: user_register,
  user_access: user_access,
  user_login: user_login,
  user_getUserInfo: user_getUserInfo,
  user_selectUserStatistic: user_selectUserStatistic,
  user_updateProfile: user_updateProfile,
  user_isFan: user_isFan,
  user_saveUserRelation: user_saveUserRelation,
  user_deleteRelation: user_deleteRelation,
  user_selectUserFollows: user_selectUserFollows,
  user_selectUserFans: user_selectUserFans,
  moment_publish: moment_publish,
  moment_uploadPic: moment_uploadPic,
  moment_selectNewMoment: moment_selectNewMoment,
  moment_selectHotMoment: moment_selectHotMoment,
  moment_selectMomentDetail: moment_selectMomentDetail,
  moment_saveMomentSee: moment_saveMomentSee,
  moment_saveMomentMark: moment_saveMomentMark,
  moment_saveMomentComment: moment_saveMomentComment,
  moment_selectUserMoments: moment_selectUserMoments,
  group_selectByType: group_selectByType,
  group_selectUserGroups: group_selectUserGroups,
  group_selectMineGroups: group_selectMineGroups,
  group_selectGroupDetail: group_selectGroupDetail,
  group_saveGroup: group_saveGroup,
  group_deleteGroup: group_deleteGroup,
  topic_selectByGroupId: topic_selectByGroupId,
  topic_publish: topic_publish,
  topic_uploadTopicPic: topic_uploadTopicPic,
  topic_selectTopicDetail: topic_selectTopicDetail,
  topic_saveTopicComment: topic_saveTopicComment,
  topic_selectGroupMyTopic: topic_selectGroupMyTopic,
  topic_deleteTopic: topic_deleteTopic
}
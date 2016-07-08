var _USER_INFOR = {
    realName: null,
    loginUserName:null,
    password: null,
    roleId:null,
}

module.exports={
	function getUserInfor() {
	    return _USER_INFOR;
	}
	
	function setUserInfor(user){
		_USER_INFOR.realName = user.realName;
		_USER_INFOR.roleId= user.roleId;
	}
}

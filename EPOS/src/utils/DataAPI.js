
//var BaseURL='http://120.26.220.46:8080/dlsfa/mobile/'
//var BaseURL='http://192.168.0.100:8080/dlsfa/mobile/'
//var BaseURL='http://117.122.201.44/dlsfa/mobile/'
//var BaseURL='http://192.168.0.107:8080/NewP/mobile/'
var BaseURL='http://117.122.201.44/dlsfa/mobile/'
module.exports={
  sysVersion:'1.0',
  mobileKey:'epos',
  osType:'ios',
  messages_list:BaseURL+'message/msglist.do',
  messages_detail:BaseURL+'message/detail.do',

  login:BaseURL+'user/login.do',
  change_pwd:BaseURL+'user/changepwd.do',
  my_information:BaseURL+'user/changepwd.do',
  
  libray_list:BaseURL+'libray/list.do',
  libray_detail:BaseURL+'libray/detail.do',
  
  survy_list:BaseURL+'survy/list.do',
  survy_detail:BaseURL+'survy/detail.do',
  survy_submit:BaseURL+'survy/submit.do',
  
  sku_arravie_list:BaseURL+'skuArravie/list.do',
  sku_arravie_reached:BaseURL+'skuArravie/reached.do',
  
  
  
  store_list:BaseURL+'store/list.do',
  store_arravie_detail:BaseURL+'store/detail.do',
  storepint_list:BaseURL+'store/point.do',
    
  home_list_pg:BaseURL+'home/listpg.do',
  home_list_tr:BaseURL+'home/listtr.do',
  home_list_ep:BaseURL+'home/listep.do',
  
  pg_worktime_detatil:BaseURL+'worktime/detail.do',
  pg_worktime_submit:BaseURL+'worktime/submit.do',

  customer_search_infor:BaseURL+'customer/search.do',
  customer_send_sms:BaseURL+'customer/sendSms.do',
  customer_submit_infor:BaseURL+'customer/submit.do',
  customer_submit_saleout:BaseURL+'skuSaleOut/submit.do',

  reporting_list_ep:BaseURL+'reporting/listep.do',
  sample_list:BaseURL+'sample/list.do',
   sample_submit:BaseURL+'sample/submit.do',
   member_advise:BaseURL+'member/advise.do',

   scane:BaseURL+'skuArravie/scane.do',
   scaneSweep:BaseURL+'sample/scane.do',
   BaseURL:BaseURL,
  scaneSaleOut:BaseURL+'skuSaleOut/scane.do',
   skuSaleOut:BaseURL+'skuSaleOut/dayOut.do',

   pg_worktime_attendence:BaseURL+'worktime/list.do',
   message_submit:BaseURL+'message/submit.do',
   message_recentlymsglist:BaseURL+'message/recentlymsglist.do',
   
}

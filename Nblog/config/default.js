/**
 * Created by Admin on 2017/11/14.
 */
module.exports = {
  port:80,
  session:{
    secret:'blog',
    key:'sessionId',
    maxAge:3600*1000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}

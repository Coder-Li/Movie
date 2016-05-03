//模式定义
var mongoose = require('mongoose');
//密码加密算法(windows 下不好安装)
// var bcrypt = require('bcrypt');
// 这里面放跟用户有过的字段和类型
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password:  String,
    
    // 0 : nomal user
    // 1: verified user
    // 2: professonal user
    // ...
    // >10: admin
    // >50 super admin
    role: {
        type: Number,
        default: 0    
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }  
})
//存数据前都会调用
UserSchema.pre('save', function(next){
    var user = this;
    
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else{
        this.meta.updateAt = Date.now();
    }
    
    // user.password = salt;
    next();
});

UserSchema.methods = {
    comparePassword: function(_password, cb){
        // bcrypt.compare(_password, this.password,function(err, isMatch){
        //     if(err){
        //         return cb(err);
        //     }
        //     cb(null, isMatch);
        // })
        if(_password === this.password){
            isMatch = true;
        }else{
            isMatch = false;
        }
            cb(null, isMatch);
    }
}

UserSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb){
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}
module.exports = UserSchema
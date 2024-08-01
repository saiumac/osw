
const SuccessValidation = async (req,res,doc,cont='') => {
    let code;
    switch (req.method) {
        case 'POST':
            code = 201
            break;
        case 'DELETE':
            code = 204
            break;
        case 'GET':
            code = 200
            break;
        case 'PUT':
            code = 200
            break;
        case 'PATCH':
            code = 200
            break;
        default:
            code = 200
    }
    return res.status(code).send(doc);
}

const ErrorValidation = async (req,res,err,errtype) => {
    //console.log(errtype)
    if(errtype=='cache'){
        let msg = (err.message)?err.message:'Try again'
        return res.status(400).send({message:msg,error:err});
    }else{
        let message = null
        let errors  = []
        if(err.code && err.code==11000){
            if (err.keyPattern){
                for (const [key, value] of Object.entries(err.keyPattern)) {
                    errors.push(key)
                }
            }
            message = errors.join(", ")+' already existed'
        }else if(err.name && err.name=='ValidationError'){
            for (const [key, value] of Object.entries(err.errors)) {
                errors.push(value['message'])
            }
            message = errors.join(", ")
        }else{
            if(err.message){
                message = err.message
            }
        }
        return res.status(400).send({message:message,error:err});
    }
}

const DT_Y_M_D = (now) => {
    var now = new Date(now);
    let date = require('date-and-time')
    let today = date.format(now, 'YYYY-MM-DD');
    return today
}

const CurrentDate = async (dttype=0,increseDateS=0) => {
    // console.log("Kesanapalli",process.env.CountryCode , new Date())
    let date = new Date()
    // console.log("Org Time",date);
    if(dttype==1){
        date = await new Date(date.setDate(date.getDate() - 30))
    }
    if(dttype==2){
        date = await new Date(date.setDate(date.getDate() + 1))
    }
    if(increseDateS>0){
        date = await new Date(date.setDate(date.getDate() + increseDateS))
    }
    let tz = null
    if(process.env.CountryCode=="SA"){
        tz = 'Africa/Johannesburg';
        // str = new Date().toLocaleString('en-US',{ timeZone: 'Africa/Johannesburg' });
    }else{
        tz = 'Asia/Kolkata';
        // str = new Date().toLocaleString('en-US',{ timeZone: 'Asia/Kolkata' })
    }
    var s = date.toLocaleString('en-GB', { timeZone: tz });
    // console.log("Current Time1",s);
    var a = s.split(/\D/);
    date = a[2] + '-' + a[1] + '-' + a[0] + ' ' + a[4] + ':' + a[5] + ':' + a[6];
    // console.log("Current Time2",date);
    // date = date.toLocaleString('en-GB', { timeZone: tz });
    if(dttype==3){
        date = a[2] + '-' + a[1] + '-' + a[0]
        // date = a[2] + '-' + a[1] + '-' + a[0] + ' ' + a[4] + ':' + a[5] + ':' + a[6];
        // date = new Date(''+date+'');
    }else{
        if(dttype==4){
            date = await moment(date)
        }else{
            date = date
        }
    }
    return date
}


const helper = {};
helper.SuccessValidation    =   SuccessValidation
helper.ErrorValidation      =   ErrorValidation
helper.DT_Y_M_D             =   DT_Y_M_D
helper.CurrentDate          =   CurrentDate

module.exports = helper;

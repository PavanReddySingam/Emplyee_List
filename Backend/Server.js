const express =require('express');
const cors=require('cors');
const mongoose=require('mongoose');
// mongoose.connect()

const app=express();

app.use(cors())
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/immensphere').then(()=>{
    console.log("database is connected...")
}).catch((err)=>console.log(err));

//create employee
const empObj=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    }
},{timestamps:true})
const Employee=mongoose.model("Employee",empObj);
app.post('/createEmployee',async(req,res)=>{
    try {
        const bodyData=req.body;
        const emp=new Employee(bodyData);
        const empData=await emp.save();//await is used for return purpose
        res.send(empData);
    } catch (error) {
        res.send(error);
    }
})
app.get('/retriveEmployees',async(req,res)=>{
    try {
        const empData=await Employee.find({});
        res.send(empData);
    } catch (error) {
        res.send(error);
    }
})
app.get('/retriveEmployees/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const emp=await Employee.find({_id:id});
        res.send(emp);
    } catch (error) {
        res.send(error);
    }
})
app.put('/updateEmployee/:id', async(req,res)=>{
    try {
        const id=req.params.id;
        const emp=await Employee.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.send(emp);
    } catch (error) {
        res.send(error);
    }
})

app.delete('/deleteEmployee/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const emp=await Employee.findByIdAndDelete({_id:id});
        res.send(emp);
    } catch (error) {
        res.send(error);
    }
})
app.delete('/deleteEmployees',async(req,res)=>{
    try {
        const delAllEmp=await Employee.deleteMany({});
        res.send(delAllEmp)
    } catch (error) {
        res.send(error);
    }
})

app.get('/',(req,res)=>{
    return res.send('Hello, world.....')
})

app.listen(5000,()=>{
    console.log('server is listening..')
})

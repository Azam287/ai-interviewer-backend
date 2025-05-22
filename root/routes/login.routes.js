
let loginRoutes = [
    {
        type:"get",
        path:"/",
        controller: (req,res)=>{
            console.log('success')
            return res.status(200).json({success:1})
        }
    }
];

module.exports={
    loginRoutes,
}
export const correctLocation = (user)=>{
    if(!user){
        return "/";
    }
    if(!user.role){
        return "/select-role"
    }
    if(user.role==="company"){
        if(!user.companyName){
            return "/company-form"
        }else{
            return "/dashboard"
        }
    }else{
        if(!user.dob){
            return "/user-form"
        }else{
            return "/user/exploration"
        }
    }
}
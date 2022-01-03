const convertToVNese =(status)=>
{
     switch (status)
       {
           case "PENDING":return "Đang làm";
           case "FINDING": return "Đang tìm người";
           case "COMPLETED":return "Đã hoàn thành";
           case "REQUESTING":return "Đang yêu cầu";
           case "ACCEPTED": return "Đã chấp nhận";
           case "REJECTED":return "Bị từ chối";
       }
}

export default convertToVNese;
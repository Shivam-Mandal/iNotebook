import React from "react";
const Alert = ({alert}) => {
    let alertClasses = "";
    if (!alert) {
      return null; 
    }
    switch (alert.type) {
      case "success":
        alertClasses = "bg-green-100 text-green-800";
        break;
      case "info":
        alertClasses = "bg-blue-100 text-blue-800";
        break;
      case "warning":
        alertClasses = "bg-yellow-100 text-yellow-800";
        break;
      case "error":
        alertClasses = "bg-red-100 text-red-800";
        break;
      default:
        alertClasses = "bg-gray-100 text-gray-800";
    }
  
    return (
      <div className={`m-auto p-3 px-10 ${alertClasses}`}>
        {alert.type} : {alert.msg}
      </div>
    );
}
export default Alert;
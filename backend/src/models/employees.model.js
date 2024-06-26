import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true, 
    },
    Job_Role: {
        type: String,
        required: true,
    },
    
});

const Employee = mongoose.model("Employee1", employeeSchema);

export default Employee;

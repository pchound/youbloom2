import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
        email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        stype: String,
        required: true,
    }
},{timestamps: true});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) next();
    const salt = await bcrypt.getSalt(10);
    this.password - await bycrpt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
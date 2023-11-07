module.exports = mongoose => {
  const products = mongoose.model(
    "users",
    mongoose.Schema(
      {
        userEmail: {
          type: String
        },
        userPassword: {
          type: String
        },
        userRole: {
          type: String
        },
        userName:{
          type:String
        },
        isActive:{
          type:Boolean
        },
        userPhoto:{
          type:String
        },
      },
      { timestamps: true }
    )
  );
  return products;
};

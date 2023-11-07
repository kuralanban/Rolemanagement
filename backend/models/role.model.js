module.exports = mongoose => {
  const role = mongoose.model(
    "role",
    mongoose.Schema(
      {
        role: {
          type: String
        },
        instrumentPermissions:{
          type:Array
        },
      },
      { timestamps: true }
    )
  );
  return role;
};

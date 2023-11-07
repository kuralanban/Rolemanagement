module.exports = (mongoose) => {
  const instruments = mongoose.model(
    "instruments",
    mongoose.Schema(
      {
        ComputerHostName:{
          type:String
      },
        instrumentName: {
          type: String,
        },
        ApplicationName:{
          type:String
        },
      instrumentLocation: {
        type: String,
       }
      },
      { timestamps: true }
    )
  );
  return instruments;
};

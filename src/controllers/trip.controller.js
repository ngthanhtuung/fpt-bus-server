const getAllTrip = async (req, res) => {};

const createTrip = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const updateTrip = async (req, res) => {};

const changeStatus = async (req, res) => {};

module.exports = {
  getAllTrip,
  createTrip,
  updateTrip,
};

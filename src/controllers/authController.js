const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
  const { login, password } = req.body;
  const { user, token } = await authService.login(login, password);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

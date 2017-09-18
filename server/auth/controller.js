import {signToken} from './auth'

export default {
  signin: (req, res, next) => {
    const token = signToken(req.user._id)
    res.json({token: token})
  }
}

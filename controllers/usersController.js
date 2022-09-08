export default {
  onDeleteToken: async (req, res) => {
    try {
      const token = req.params.token

      console.log(global.io.sockets)

      return res.status(200).json({ success: true, token: token });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  }
}
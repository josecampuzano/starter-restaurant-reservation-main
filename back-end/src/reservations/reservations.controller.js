/**
 * List handler for reservation resources
 */
const reservationService = require("./reservations.service")

async function list(req, res) {
  const data = await reservationService.list()
  res.json({ data })
}

module.exports = {
  list,
};
